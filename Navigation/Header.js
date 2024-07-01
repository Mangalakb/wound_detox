import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Appbar, Avatar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Styles from "../common/Style";

const Header = ({ navigation }) => {
  const openDrawer = () => {
    // You can use the navigation prop to open the drawer
    navigation.openDrawer();
  };

  return (
    <Appbar.Header style={Styles.header}>
      {/* Drawer Icon */}
      <TouchableOpacity onPress={openDrawer}>
        <MaterialCommunityIcons name="menu" size={24} color="orange" />
      </TouchableOpacity>

      {/* Logo */}
      <View style={Styles.centerLogo}>
        <Text>Wound Detox</Text>
      </View>
    </Appbar.Header>
  );
};

export default Header;
