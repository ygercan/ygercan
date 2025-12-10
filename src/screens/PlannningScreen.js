import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import SunCalc from 'suncalc';

export default function PlanningScreen() {
  const [location, setLocation] = useState(null);
  const [planData, setPlanData] = useState([]);

  useEffect(() => {
    (async () => {
      const locStatus = await Location.requestForegroundPermissionsAsync();
      if (locStatus.status !== 'granted') return;

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      generatePlan(loc.coords);
    })();
  }, []);

  const generatePlan = (coords) => {
    const today = new Date();
    const days = 7; // gelecek 7 gün

    let data = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const moonPos = SunCalc.getMoonPosition(date, coords.latitude, coords.longitude);
      const moonIllum = SunCalc.getMoonIllumination(date);

      // Öneri örneği: faz ve ışık durumuna göre
      const recommendedTime = moonIllum.phase < 0.5 ? '21:00' : '20:30';

      data.push({
        date: date.toDateString(),
        azimuth: (moonPos.azimuth * 180/Math.PI).toFixed(2),
        altitude: (moonPos.altitude * 180/Math.PI).toFixed(2),
        phase: moonIllum.phase.toFixed(2),
        recommendedTime,
      });
    }
    setPlanData(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gelecek 7 Gün Ay Planlaması</Text>
      <FlatList
        data={planData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>{item.date}</Text>
            <Text style={styles.text}>Azimut: {item.azimuth}° | Yükseklik: {item.altitude}°</Text>
            <Text style={styles.text}>Faz: {item.phase}</Text>
            <Text style={styles.text}>Önerilen Çekim Saati: {item.recommendedTime}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 10 },
  card: { backgroundColor: '#222', padding: 10, borderRadius: 10, marginBottom: 10 },
  text: { color: 'white', marginBottom: 5 },
});
