import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HOME,PRODUCTS } from "../common/Constants";
import Header from "./Header";
import Layout from "./Layout";
import Home from "../screens/Home";
import Products from "../screens/Products";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function TopNavigation() {
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <Layout {...props} navigation={props.navigation}/>}
          initialRouteName={HOME}
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
            name={PRODUCTS}
            component={Products}
            options={{
              header: (props) => <Header {...props} />,
              headerShown: true,
            }}
          />
        </Drawer.Navigator>
        
      </NavigationContainer>
    </>
  );
}
export default TopNavigation;
