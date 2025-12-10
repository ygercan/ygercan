import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PhotoDetailScreen({ route, navigation }) {
  const { photo } = route.params;
  const [note, setNote] = useState(photo.note || '');

  const saveNote = async () => {
    try {
      const stored = await AsyncStorage.getItem('photos');
      const photos = stored ? JSON.parse(stored) : [];
      const updatedPhotos = photos.map(p => 
        p.uri === photo.uri ? { ...p, note } : p
      );
      await AsyncStorage.setItem('photos', JSON.stringify(updatedPhotos));
      alert('Not kaydedildi!');
    } catch (e) {
      console.log('Not kaydedilemedi', e);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo.uri }} style={styles.image} />
      <Text style={styles.text}>Tarih: {new Date(photo.date).toLocaleString()}</Text>
      <Text style={styles.text}>Ay Fazı: {photo.moonPhase}</Text>

      <TextInput
        style={styles.input}
        placeholder="Not ekle..."
        value={note}
        onChangeText={setNote}
        multiline
      />
      <Button title="Notu Kaydet" onPress={saveNote} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  image: { width: '100%', height: 300, borderRadius: 10, marginBottom: 10 },
  text: { color: 'white', marginBottom: 5 },
  input: { backgroundColor: '#333', color: 'white', borderRadius: 10, padding: 10, marginBottom: 10, minHeight: 60 },
});
