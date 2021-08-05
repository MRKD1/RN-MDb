import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';

import Main from './app/pages/Main';
import MovieDetails from './app/pages/MovieDetails';

const Stack = createStackNavigator();

export default function App() {

  let [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./app/assets/fonts/Poppins-Regular.ttf'),
  });

  if(!fontsLoaded) {
    <View></View>
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen
          name='Main'
          component={Main}
          options={{ title: 'Main' }}
        />

        <Stack.Screen
          name='MovieDetails'
          component={MovieDetails}
          options={{ title: 'MovieDetails' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
