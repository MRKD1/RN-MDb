import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

import Main from './app/pages/Main';
import MovieDetails from './app/pages/MovieDetails';
import ThemeContextProvider from './app/contexts/ThemeContext';
import ViewAll from './app/pages/ViewAll';
import AppIntro from './app/pages/AppIntro';
import CastViewAll from './app/pages/CastViewAll';

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {

  const [fontsLoaded, setFontLoaded] = useState(false);
  const [initialPage, setInitialPage] = useState("Main");
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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

  async function registerForPushNotificationsAsync() {
    let token;
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    //console.log(token);

    /* if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }*/

    return token;
  }

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

    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response.notification.request.content.data);
        const movieData = response.notification.request.content.data;
      }
    );

    getPage().then(() => loadResourcesAndDataAsync());

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    }
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

          <Stack.Screen
            name='CastViewAll'
            component={CastViewAll}
            options={{ title: 'CastViewAll' }}
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
