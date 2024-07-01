import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "../../common/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const navigation = useNavigation();
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  // Validation function for login inputs
  const validateInputs = () => {
    if (!mobileNumber.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter mobile number and password.");
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (!validateInputs()) {
      return;
    }

    const userData = {
      mobile: mobileNumber.trim(),
      password: password.trim(),
    };

    axios
      .post(`${API_URL}/login`, userData)
      .then(async (response) => {
        const status = response.data.status;
        if (status === 200) {
          console.log("Login successful");
          setMobileNumber("");
          setPassword("");
          try {
            await AsyncStorage.removeItem("userData");
            await AsyncStorage.setItem(
              "userData",
              JSON.stringify(response.data.msg)
            );
          } catch (error) {
            console.error("Error saving user data:", error);
          }

          navigation.navigate("Home");
        } else if (status === 201) {
          console.log("User is inactive");
          Alert.alert(response.data.msg);
        } else if (status === 404) {
          console.log("User Does not exist");
          Alert.alert(response.data.msg);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        if (error.response && error.response.status === 404) {
          console.log("User does not exist");
          Alert.alert("Error", "User does not exist.");
        } else {
          Alert.alert("Error", "Invalid Details");
        }
      });
  };

  const handleLink = () => {
    navigation.navigate("Registration");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/banner.jpg")} style={styles.image} />
      <View style={styles.card}>
        <Text style={styles.heading}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="numeric"
          value={mobileNumber}
          onChangeText={(text) => setMobileNumber(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.button}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLink}>
          <Text style={styles.registrationLink}>Registration</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",

    // paddingHorizontal: 10,
  },
  image: {
    width: 400,
    height: 300,
    marginBottom: -50,
  },
  card: {
    backgroundColor: "#e1e1e1",
    borderRadius: 40,
    padding: 20,
    width: "100%",
    // alignItems: "center",
    position: "absolute",
    top: 270,
    height: 500,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
    marginTop: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#cccccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#f9f9f9",
  },
  button: {
    height: 50,
    width: "100%",
    borderColor: "#cccccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#6a50a9",
    textAlign: "center",
    paddingVertical: 10,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  registrationLink: {
    marginTop: 10,
    color: "#007bff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  adminLink: {
    marginTop: 10,
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Login;
