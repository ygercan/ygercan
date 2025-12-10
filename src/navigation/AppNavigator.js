import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PlanningScreen from '../screens/PlanningScreen';
import LibraryScreen from '../screens/LibraryScreen';
import InfoScreen from '../screens/InfoScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Planning" component={PlanningScreen} />
      <Stack.Screen name="Library" component={LibraryScreen} />
      <Stack.Screen name="Info" component={InfoScreen} />
    </Stack.Navigator>
  );
}

import PhotoDetailScreen from '../screens/PhotoDetailScreen';

// Stack.Navigator içine ekle
<Stack.Screen name="PhotoDetail" component={PhotoDetailScreen} />
