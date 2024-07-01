import { Dimensions } from "react-native";
import Constants from "expo-constants";

// Background tasks
export const BACKGROUND_TASK_LOCATION_MANAGER = "SafetyApp_LocationManager";
export const BACKGROUND_TASK_MOTION_MONITOR = "SafetyApp_MotionMonitor";
export const API_URL = "http://192.168.164.194:5000";
// Device dimensions
export const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
export const HEIGHT = Dimensions.get("screen").height;
export const WIDTH = Dimensions.get("screen").width;

// Snack constants
export const ERROR = "error";
export const WARNING = "warning";
export const SUCCESS = "success";

// Screen Names
export const HOME = "Home";
export const LOGOUT = "Log Out";
export const LOGIN = "Login";
export const LANDING = "Landing";
export const REGISTRATION = "Registration";
export const AGRITESTMODEL = "Predict Agriculture";
export const VEGTESTMODEL = "Predict Vegetation";
export const HEALTHTESTMODEL = "Predict Health";
