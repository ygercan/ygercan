import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Kamera Yardımcısı Ekranı</Text>
      <Button title="Planlama" onPress={() => navigation.navigate('Planning')} />
      <Button title="Kütüphane" onPress={() => navigation.navigate('Library')} />
      <Button title="Ay Bilgi" onPress={() => navigation.navigate('Info')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, marginBottom: 20 },
});
