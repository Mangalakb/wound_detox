import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import axios from "axios";

const MediumLevelFirstAid = ({ latitude, longitude }) => {
  const [nearbyHospitals, setNearbyHospitals] = useState([]);

  useEffect(() => {
    const fetchNearbyHospitals = async () => {
      try {
        const apiKey = "AIzaSyDdzOoBadUjbHkFwrSRtuhFs40wB1yy_ho";
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=10000&type=hospital&key=${apiKey}`
        );

        if (response.data && response.data.results) {
          const limitedHospitals = response.data.results.slice(0, 5);
          setNearbyHospitals(limitedHospitals);
        }
      } catch (error) {
        console.error("Error fetching nearby hospitals:", error);
      }
    };

    fetchNearbyHospitals();
  }, [latitude, longitude]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>First Aid Tips for Minor Injuries</Text>
      <View style={styles.card}>
        <Text style={styles.detailsText}>
          - Clean the wound with mild soap and water.
          {"\n"}- Apply an antibiotic ointment to prevent infection.
          {"\n"}- Cover the wound with a sterile bandage.
          {"\n"}- Change the bandage daily and monitor for signs of infection.
        </Text>
      </View>
      <Text style={styles.subHeading}>Nearby Hospitals:</Text>
      <ScrollView style={styles.scrollView}>
        {nearbyHospitals.map((hospital) => (
          <View key={hospital.id} style={styles.hospitalCard}>
            <Text style={styles.hospitalName}>{hospital.name}</Text>
            <Text style={styles.hospitalAddress}>{hospital.vicinity}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  detailsText: {
    fontSize: 16,
  },
  scrollView: {
    maxHeight: 220,
  },
  hospitalCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  hospitalName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  hospitalAddress: {
    fontSize: 14,
  },

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
});

export default MediumLevelFirstAid;
