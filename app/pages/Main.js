import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SQLite from "expo-sqlite";

import Home from "./../pages/Home";
import Favorite from "./../pages/Favorite";
import Settings from "./../pages/Settings";

const Tab = createBottomTabNavigator();
const db = SQLite.openDatabase("movie.db");

class Main extends Component {
    constructor() {
        super();

        state={
            isLoading: false,
            genres: []
        };

        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS Favorites (id INTEGER PRIMARY KEY AUTOINCREMENT, movie_id INT, title TEXT, genres TEXT, overview TEXT, popularity TEXT, release_date TEXT, vote_average TEXT, vote_count TEXT, poster TEXT, backdrop TEXT);"
            );
        });

        this.fetchData();
    }

    fetchData() {
        return fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=6269ca319ffc8277bdd7de26a3894f6e')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                genres: responseJson.genres,
            });
        })
        .catch((error) => console.error(error));
    }



    render() {
        const HomeComponent = (props) => <Home genres={this.state.genres} />
        if(this.state.isLoading) {
            <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator />
            </SafeAreaView>
            
        }
        return (
            <Tab.Navigator tabBarOptions={{ activeTintColor: '#000000', inactiveTintColor: '#999999', labelStyle: {fontFamily: "Poppins-Regular"}}} initialRouteName="Home">
                <Tab.Screen options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }} 
                name="Home" 
                component={HomeComponent} 
                />
                <Tab.Screen options={{
                    tabBarLabel: 'Favorite',
                    tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="heart" color={color} size={26} />
                    ),
                }}  
                name="Favorite" 
                component={Favorite} 
                />
                <Tab.Screen options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="cog" color={color} size={26} />
                    ),
                }}  
                name="Settings" 
                component={Settings} 
                />
            </Tab.Navigator>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
});

export default Main;