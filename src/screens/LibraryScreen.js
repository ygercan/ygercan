import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LibraryScreen() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const stored = await AsyncStorage.getItem('photos');
        if (stored) setPhotos(JSON.parse(stored));
      } catch (e) {
        console.log('Fotoğraflar yüklenemedi', e);
      }
    };
    fetchPhotos();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={photos.reverse()} // son çekilen en üstte
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <Text style={styles.text}>Tarih: {new Date(item.date).toLocaleString()}</Text>
            <Text style={styles.text}>Ay Fazı: {item.moonPhase}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { marginBottom: 15, borderRadius: 10, overflow: 'hidden', backgroundColor: '#222', padding: 5 },
  image: { width: '100%', height: 200, borderRadius: 10 },
  text: { color: 'white', marginTop: 5 },
});

<TouchableOpacity onPress={() => navigation.navigate('PhotoDetail', { photo: item })}>
  <Image source={{ uri: item.uri }} style={styles.image} />
</TouchableOpacity>
