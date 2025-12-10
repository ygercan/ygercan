import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LibraryScreen from './screens/LibraryScreen';
import PhotoDetailScreen from './screens/PhotoDetailScreen';
import PlanningScreen from './screens/PlanningScreen';
import MoonInfoScreen from './screens/MoonInfoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#111' }, headerTintColor: 'white' }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Library" component={LibraryScreen} />
        <Stack.Screen name="PhotoDetail" component={PhotoDetailScreen} />
        <Stack.Screen name="Planning" component={PlanningScreen} />
        <Stack.Screen name="MoonInfo" component={MoonInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
