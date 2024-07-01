import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LowLevelFirstAid = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>First Aid Tips for Minor Injuries</Text>
      <Text style={styles.detailsText}>
        - Clean the wound with mild soap and water.
        {"\n"}- Apply an antibiotic ointment to prevent infection.
        {"\n"}- Cover the wound with a sterile bandage.
        {"\n"}- Change the bandage daily and monitor for signs of infection.
        {"\n"}- Change the bandage daily and monitor for signs of infection.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
  },
});

export default LowLevelFirstAid;
