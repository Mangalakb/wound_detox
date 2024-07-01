import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";

const Landing = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate("Login"); // Navigate to the Login screen
  };

  const handleVisitorLogin = () => {
    navigation.navigate("VisitorLogin"); // Navigate to the Registration screen
  };

  return (
    <View style={styles.container}>
      {/* Logo */}

      {/* Login Link */}
      <TouchableOpacity onPress={handleLogin} style={styles.link}>
        <Text style={styles.linkText}>Employee Login</Text>
      </TouchableOpacity>

      {/* Registration Link */}
      <TouchableOpacity onPress={handleVisitorLogin} style={styles.link}>
        <Text style={styles.linkText}>Visitor Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 40,
    width: 150,
    marginBottom: 30,
  },
  link: {
    padding: 10,
    marginVertical: 10,
  },
  linkText: {
    fontSize: 18,
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default Landing;
