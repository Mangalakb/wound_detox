import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import axios from "axios";
import { API_URL } from "../../common/Constants";
import LowLevelFirstAid from "./LowLevelFirstAid";
import MediumLevelFirstAid from "./MediumLevelFirstAid";
import HighLevelAid from "./HighLevelAid";

const Home = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef(null);
  const [classification, setClassification] = useState("");
  const [loading, setLoading] = useState(false);
  const [lowLevel, setLowLevel] = useState(false);
  const [mediumLevel, setMediumLevel] = useState(false);
  const [highLevel, setHighLevel] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: 15.1575206,
    longitude: 76.8889174,
  }); // Store user's current location

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== "granted") {
        Alert.alert(
          "Camera Access Required",
          "Please grant camera access to use this feature.",
          [
            {
              text: "OK",
              onPress: () => {
                setHasCameraPermission(false);
              },
            },
          ]
        );
      } else {
        setHasCameraPermission(true);
      }
    })();
  }, []);

  const handleTakePhoto = () => {
    setShowCamera(true);
    setLowLevel(false);
    setMediumLevel(false);
    setHighLevel(false);
    setClassification(false);
  };

  const handleImageUpload = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      setImage(photo.uri);
      setShowCamera(false);
    } else {
      Alert.alert("Error", "Camera reference not found");
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      Alert.alert("Error", "Please capture an image first.");
      return;
    }

    try {
      setClassification("");
      setLoading(true);

      let formData = new FormData();
      formData.append("image", {
        uri: image,
        type: "image/jpeg",
        name: "image.jpg",
      });

      let response = await axios.post(`${API_URL}/classification`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setClassification(response.data.prediction);

      const level = getClassificationLevel(response.data.prediction);
      setLowLevel(level === "Low");
      setMediumLevel(level === "Medium");
      setHighLevel(level === "High");
    } catch (error) {
      console.error("Error sending image:", error);
    } finally {
      setLoading(false);
    }
  };

  const getClassificationLevel = (classification) => {
    let level = "Unknown";

    if (classification === "Abrasions" || classification === "Bruises") {
      level = "Low";
    } else if (classification === "Cut" || classification === "Laceration") {
      level = "Medium";
    } else if (classification === "Stab Wound") {
      level = "High";
    }

    return level;
  };

  return (
    <View style={styles.container}>
      {!hasCameraPermission ? (
        <Text>No camera permission</Text>
      ) : showCamera ? (
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          ref={cameraRef}
        />
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="Take Photo" onPress={handleTakePhoto} />
        </View>
      )}
      {showCamera && (
        <View style={styles.buttonContainer}>
          <Button title="Capture Image" onPress={handleImageUpload} />
        </View>
      )}
      {image && (
        <View style={styles.submitContainer}>
          <Button
            title={loading ? "Predicting..." : "Submit"}
            onPress={handleSubmit}
            disabled={loading}
          />
          {loading && <ActivityIndicator style={{ marginTop: 10 }} />}
        </View>
      )}
      {classification ? (
        <View style={styles.classificationContainer}>
          <Text style={styles.classification}>
            Classification : {classification}
          </Text>
          {lowLevel && <LowLevelFirstAid />}
          {mediumLevel && (
            <MediumLevelFirstAid
              latitude={userLocation.latitude}
              longitude={userLocation.longitude}
            />
          )}

          {highLevel && <HighLevelAid />}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: 300,
  },
  buttonContainer: {
    position: "absolute",
    bottom: "25%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  submitContainer: {
    position: "absolute",
    bottom: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  classificationContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  detailsText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },

  classification: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    marginBottom: 10,
  },
});

export default Home;
