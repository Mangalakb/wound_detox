# start server
# flask run --host=0.0.0.0 --reload
from flask import Flask, request, jsonify
from config import connect_to_database
from flask import jsonify
from flask_cors import CORS
import os
from tensorflow.keras.preprocessing import image
import numpy as np
import tensorflow as tf

app = Flask(__name__)
CORS(app)


@app.route("/login", methods=["POST"])
def login():
    conn = connect_to_database()
    data = request.get_json()  # Get JSON data from the request body
    mobile = data.get("mobile")
    password = data.get("password")

    if not mobile or not password:
        return jsonify({"message": "Mobile number and password are required"}), 400

    # Check if user exists based on mobile number
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE us_mobile = %s", (mobile,))
    user = cursor.fetchone()
    print(user[4])

    if (
        not user or user[4] != password
    ):  # Assuming 'us_password' is at index 2 in the tuple
        cursor.close()
        return jsonify({"message": "Invalid mobile number or password"}), 401

    cursor.close()
    return jsonify({"message": "Login successful", "status": 200, "msg": user})


@app.route("/register", methods=["POST"])
def register():
    conn = connect_to_database()
    if not conn:
        return jsonify({"message": "Database connection error"}), 500

    try:
        data = request.get_json()
        name = data["name"]
        mobile = data["mobile"]
        password = data["password"]

        # Check if mobile number already exists
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE us_mobile = %s", (mobile,))
        existing_user = cursor.fetchone()
        if existing_user:
            cursor.close()
            conn.close()
            return jsonify({"message": "Mobile number already exists"}), 400

        # If mobile number doesn't exist, proceed with registration
        cursor.execute(
            "INSERT INTO users (us_name, us_mobile, us_password) VALUES (%s, %s, %s)",
            (name, mobile, password),
        )
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "User registered successfully"}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "Failed to register user"}), 400


@app.route("/classification", methods=["POST"])
def classification():
    # Check if the POST request contains a file
    if "image" not in request.files:
        return "No file part in the request", 400

    file = request.files["image"]

    # Check if the file is empty
    if file.filename == "":
        return "No selected file", 400

    # Save the file to a folder
    upload_folder = "uploads"  # Change this to your desired folder path
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)

    file_path = os.path.join(upload_folder, file.filename)
    file.save(file_path)

    def predict_wound_type(image_path):
        model = tf.keras.models.load_model("models/wound_classification_model.h5")
        img = image.load_img(image_path, target_size=(150, 150))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0  # Normalize the image
        prediction = model.predict(img_array)
        # Get the class index with the highest probability
        predicted_class_index = np.argmax(prediction)
        # Mapping of class index to wound type
        class_mapping = {
            0: "Abrasions",
            1: "Bruises",
            2: "Cut",
            3: "Laceration",
            4: "Stab Wound",
        }

        # Get the predicted wound type
        predicted_wound_type = class_mapping[predicted_class_index]
        return predicted_wound_type

    # Example usage
    image_path = "uploads/image.jpg"
    predicted_type = predict_wound_type(image_path)

    return jsonify({"message": "Success", "prediction": predicted_type}), 200


if __name__ == "__main__":
    app.run(debug=True)
