import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import SunCalc from 'suncalc';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const [moonPos, setMoonPos] = useState(null);
  const [moonPhase, setMoonPhase] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      const locStatus = await Location.requestForegroundPermissionsAsync();
      if (locStatus.status !== 'granted') {
        console.log('Konum izni gerekli!');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      const now = new Date();
      const moon = SunCalc.getMoonPosition(now, location.latitude, location.longitude);
      setMoonPos(moon);
      const moonPhaseValue = SunCalc.getMoonIllumination(now).phase; // 0-1
      setMoonPhase(moonPhaseValue);
    }
  }, [location]);

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>Kamera izni gerekli!</Text>;
  if (!location || !moonPos) return <Text>Konum ve Ay verisi yükleniyor...</Text>;

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log('Fotoğraf URI:', photo.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef}>
        {/* AR Overlay */}
        // Overlay kısmını güncelle
<View style={styles.overlay}>
  <Ionicons name="ellipse-outline" size={100} color="yellow" />
  <Text style={styles.overlayText}>
    Azimut: {moonPos.azimuth.toFixed(2)}° | Yükseklik: {(moonPos.altitude*180/Math.PI).toFixed(2)}°
  </Text>
  <Text style={styles.overlayText}>Faz: {moonPhase.toFixed(2)}</Text>

  {/* Basit pozlama önerisi */}
  <Text style={styles.overlayText}>
    ISO: {moonPhase < 0.5 ? 400 : 100} | Enstantane: {moonPhase < 0.5 ? '1/60' : '1/125'}
  </Text>

  {/* Lens önerisi */}
  <Text style={styles.overlayText}>
    Odak: {moonPhase < 0.5 ? '200mm+' : '100-150mm'}
  </Text>

  {/* Ek ipucu */}
  <Text style={styles.overlayText}>
    {moonPhase < 0.5 ? 'Hilal detayları için ışık açısını bekleyin' : 'Dolunayda yüzey detayları göze çarpar'}
  </Text>
</View>


        {/* Alt Bar */}
        <View style={styles.bottomBar}>
          <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
            <Ionicons name="camera" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Library')}>
            <Ionicons name="images" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1, justifyContent: 'space-between' },
  overlay: {
    position: 'absolute',
    top: '35%',
    left: '25%',
    alignItems: 'center',
  },
  overlayText: { color: 'yellow', fontWeight: 'bold', marginTop: 5 },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 50,
  },
});

import AsyncStorage from '@react-native-async-storage/async-storage';

// takePicture fonksiyonunu güncelle
const takePicture = async () => {
  if (cameraRef.current) {
    const photo = await cameraRef.current.takePictureAsync();
    console.log('Fotoğraf URI:', photo.uri);

    // Fotoğraf URI'sini kaydet
    try {
      const existing = await AsyncStorage.getItem('photos');
      const photos = existing ? JSON.parse(existing) : [];
      photos.push({
        uri: photo.uri,
        date: new Date().toISOString(),
        moonPhase: moonPhase.toFixed(2),
      });
      await AsyncStorage.setItem('photos', JSON.stringify(photos));
    } catch (e) {
      console.log('Fotoğraf kaydedilemedi', e);
    }
  }
};
