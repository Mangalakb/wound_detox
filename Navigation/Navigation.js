import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import { createStackNavigator } from "@react-navigation/stack";
import Header from "./Header";
import Layout from "./Layout";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Landing from "../screens/Landing";
import Registration from "../screens/Registration";
import { HOME, LOGIN, LANDING, REGISTRATION } from "../common/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      setIsLoggedIn(userDataString !== null);
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => (
          <Layout {...props} navigation={props.navigation} />
        )}
        initialRouteName={LOGIN}
      >
        <Drawer.Screen
          name={HOME}
          component={Home}
          options={{
            header: (props) => <Header {...props} />,
            headerShown: true,
          }}
        />

        <Drawer.Screen
          name={LOGIN}
          component={Login}
          options={{
            header: (props) => <Header {...props} />,
            headerShown: true,
          }}
        />

        <Drawer.Screen
          name={REGISTRATION}
          component={Registration}
          options={{
            header: (props) => <Header {...props} />,
            headerShown: true,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
