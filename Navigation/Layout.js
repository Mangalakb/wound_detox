import React, { useEffect, useState } from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Drawer, Avatar, Title, Divider } from "react-native-paper";
import {
  HOME,
  LOGOUT,
  AGRITESTMODEL,
  VEGTESTMODEL,
  HEALTHTESTMODEL,
} from "../common/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const Layout = (props) => {
  const { navigation } = props;
  const [active, setActive] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");

  const retrieveUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      if (userDataString !== null) {
        const userDataArray = JSON.parse(userDataString);
        if (Array.isArray(userDataArray) && userDataArray.length > 0) {
          const firstUserOrAdmin = userDataArray[0];
          if (firstUserOrAdmin.us_name) {
            // User data exists
            const name = firstUserOrAdmin.us_name;
            setRole("");
            setUserName(name);
          }
        } else {
          console.error("Invalid userData format:", userDataArray);
        }
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      retrieveUserData();
    }, 5000);
  }, [role]);

  const handleNavigation = async (screen) => {
    setActive(screen);
    if (screen === LOGOUT) {
      navigation.navigate("Login");
      await AsyncStorage.clear();
    } else {
      navigation.navigate(screen);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section style={{ alignItems: "center", paddingVertical: 20 }}>
        <Avatar.Icon size={64} icon="account-circle" />
        <Title>{userName}User</Title>
      </Drawer.Section>

      <Drawer.Item
        icon="home"
        label={HOME}
        active={active === HOME}
        onPress={() => handleNavigation(HOME)}
      />
      <Divider></Divider>

      <Drawer.Item
        icon="logout"
        label={LOGOUT}
        active={active === LOGOUT}
        onPress={() => handleNavigation(LOGOUT)}
      />

      <Divider></Divider>
    </DrawerContentScrollView>
  );
};

export default Layout;
