import React, { useState, useRef, useEffect} from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Main from './app/pages/Main';
import MovieDetails from './app/pages/MovieDetails';
import ThemeContextProvider from './app/contexts/ThemeContext';
import ViewAll from './app/pages/ViewAll';
import AppIntro from './app/pages/AppIntro';

const Stack = createStackNavigator();

export default function App() {

  const [fontsLoaded, setFontLoaded] = useState(false);
  const [initialPage, setInitialPage] = useState("Main");

  const getPage = async () => {
    try {
      const value = await AsyncStorage.getItem("isFirstRun");
      if (value == "true" || value == null) {
        setInitialPage("AppIntro");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await Font.loadAsync({
          'Poppins-Regular': require('./app/assets/fonts/Poppins-Regular.ttf'),
          'Poppins-Light': require('./app/assets/fonts/Poppins-Light.ttf'),
          'Poppins-SemiBold': require('./app/assets/fonts/Poppins-SemiBold.ttf'),
          'Poppins-Bold': require('./app/assets/fonts/Poppins-Bold.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setFontLoaded(true);
      }
    }

    getPage().then(() => loadResourcesAndDataAsync());
  }, []);

  if(!fontsLoaded) {
    return null;
  }


  return (
    <ThemeContextProvider>
      <StatusBar style="auto"></StatusBar>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialPage} screenOptions={{ headerShown: false, }}>
        
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

          <Stack.Screen
            name='ViewAll'
            component={ViewAll}
            options={{ title: 'ViewAll' }}
          />

          <Stack.Screen
            name='AppIntro'
            component={AppIntro}
            options={{ title: 'AppIntro' }}
          />


        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContextProvider>
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
