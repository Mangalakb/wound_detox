import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

const HighLevel = () => {
  const phoneNumber = "108";

  useEffect(() => {
    const handlePhoneCall = async () => {
      const phoneUrl = `tel:${phoneNumber}`;
      const canOpenPhoneUrl = await Linking.canOpenURL(phoneUrl);

      if (canOpenPhoneUrl) {
        Linking.openURL(phoneUrl);
      } else {
        console.error("Cannot open phone URL.");
      }
    };

    handlePhoneCall();
  }, []);

  return (
    <View>
      <Text style={styles.infoText}>
        Initiating phone call to Ambulance Number {phoneNumber}...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default HighLevel;
