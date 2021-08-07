import React, { Component } from 'react'
import { Text, StyleSheet, View, Switch, Alert } from 'react-native'
import Constants from "expo-constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemeContext } from "../contexts/ThemeContext";


export default class Settings extends Component {

    showLicenses = () => Alert.alert("Licenses", "xxx", [ { text: "Cancel", style: "cancel",}, { text: "Ok", style: "ok",}, ], { cancelable: true } );

    render() {
        return (
            <ThemeContext.Consumer>
                {(context) => {
                    const { isDarkMode, light, dark, updateTheme } = context;
                    return (
                        <View style={[styles.container, { color: isDarkMode ? light.bg : dark.bg },]}>
                            <Text style={[styles.title, { color: isDarkMode ? light.bg : dark.bg }]}>Settings</Text>
                            <View style={styles.settingsItem}>
                                <View style={styles.settingsItem2}>
                                    <MaterialCommunityIcons name={isDarkMode ? "weather-night" : "weather-sunny"} size={26} color={isDarkMode ? light.bg : dark.bg} />
                                    <Text style={{ marginLeft: 10, fontFamily: "Poppins-Light", fontSize: 15, color: isDarkMode ? light.bg : dark.bg}}>Dark Mode</Text>
                                </View>
                                <Switch value={isDarkMode} onValueChange={updateTheme} trackColor={{ false: "#f4f3f4", true: "#f4f3f4" }} thumbColor={isDarkMode ? "#26ed7c" : "#f4f3f4"} />
                            </View>
                            <TouchableWithoutFeedback style={styles.listitem} onPress={this.showLicenses}>
                                <View style={[styles.settingsItem2, { paddingHorizontal: 20 }]}>
                                    <MaterialCommunityIcons name="book-open-outline" size={26} color={isDarkMode ? light.bg : dark.bg} />
                                    <Text style={{ marginLeft: 10, fontFamily: "Poppins-Light", fontSize: 15, color: isDarkMode ? light.bg : dark.bg}}>Licenses</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback style={styles.listItem}>
                                <View style={[styles.settingsItem2, {paddingHorizontal: 20}]}> 
                                    <MaterialCommunityIcons name="information-outline" size={26} color={isDarkMode ? light.bg : dark.bg} />
                                    <View style={{flexDirection: "row", justifyContent: "space-between", flex: 1, paddingRight: 20,}}>
                                        <Text style={{ marginLeft: 10, fontFamily: "Poppins-Light", fontSize: 15, color: isDarkMode ? light.bg : dark.bg}}>Version</Text>
                                        <Text style={{ color: isDarkMode ? light.bg : dark.bg }}>v{Constants.manifest.version}</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    );
                }}
            </ThemeContext.Consumer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Constants.statusBarHeight + 10,
    },
    listItem: {
      marginVertical: 10,
    },
    settingsItem: {
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    settingsItem2: {
        flexWrap: "wrap",
        alignItems: "center",
        flexDirection: "row",
      },
    header: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 20,
    },
    title: {
      paddingLeft: 20,
      fontSize: 22,
      fontFamily: "Poppins-SemiBold",
      marginBottom: 20,
    },
});