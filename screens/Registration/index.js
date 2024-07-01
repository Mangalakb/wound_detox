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
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  // Validation function for login inputs

  const handleRegistration = () => {
    if (!validateForm()) {
      return;
    }

    const userData = {
      name: name,
      mobile: mobileNumber,
      password: password,
    };

    axios
      .post(`${API_URL}/register`, userData)
      .then((response) => {
        console.log(response.status);
        if (response.data.status === 409) {
          Alert.alert("User already exists. Please login.");
          navigation.navigate("Login");
        } else {
          Alert.alert("Registration successful");
          setName("");
          setMobileNumber("");
          setPassword("");
          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        Alert.alert("Registration failed, Please try again later");
      });
  };

  const handleLink = () => {
    navigation.navigate("Login");
  };

  const validateForm = () => {
    // Validate name
    if (!name.trim()) {
      Alert.alert("Name is required");
      return false;
    }

    // Validate mobile number
    if (!mobileNumber.trim()) {
      Alert.alert("Mobile number is required");
      return false;
    } else if (!/^\d{10}$/.test(mobileNumber.trim())) {
      Alert.alert("Invalid mobile number. It should be 10 digits.");
      return false;
    }

    // Validate password
    if (!password.trim()) {
      Alert.alert("Password is required");
      return false;
    }

    return true;
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/banner.jpg")} style={styles.image} />
      <View style={styles.card}>
        <Text style={styles.heading}>Registration</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />

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
        <TouchableOpacity onPress={handleRegistration}>
          <Text style={styles.button}>Register</Text>
        </TouchableOpacity>
        {/* <Button title="Login" onPress={handleLogin} style={styles.input} /> */}
        <TouchableOpacity onPress={handleLink}>
          <Text style={styles.registrationLink}>Login</Text>
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
    top: 200,
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
