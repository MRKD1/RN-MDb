import React, { Component } from 'react';
import { Text, StyleSheet, View, Switch, Alert } from 'react-native';
import Constants from 'expo-constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

import { ThemeContext } from '../contexts/ThemeContext';

export default class Settings extends Component {
  state = {
    selectedTriggerValue: '15',
  };

  getTriggerValue = async () => {
    try {
      const value = await AsyncStorage.getItem('triggerValue');

      if (value == null) {
        await AsyncStorage.setItem('triggerValue', '15');
      } else {
        this.setState({
          selectedTriggerValue: value,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  constructor() {
    super();
    this.getTriggerValue();
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {context => {
          const { isDarkMode, light, dark, updateTheme } = context;
          return (
            <View style={[styles.container, { backgroundColor: isDarkMode ? dark.bg : light.bg }]}>
              <Text style={[styles.title, { color: isDarkMode ? light.bg : dark.bg }]}>Settings</Text>
              <View style={styles.settingsItem}>
                <View style={styles.settingsItem2}>
                  <MaterialCommunityIcons name={isDarkMode ? 'weather-night' : 'weather-sunny'} size={26} color={isDarkMode ? light.bg : dark.bg} />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: 'Poppins-Light',
                      fontSize: 15,
                      color: isDarkMode ? light.bg : dark.bg,
                    }}
                  >
                    Dark Mode
                  </Text>
                </View>
                <Switch value={isDarkMode} onValueChange={updateTheme} trackColor={{ false: '#f4f3f4', true: '#f4f3f4' }} thumbColor={isDarkMode ? 'red' : '#f4f3f4'} />
              </View>

              <View style={styles.settingsItem}>
                <View style={[styles.settingsItem2]}>
                  <MaterialCommunityIcons name="bell-outline" size={26} color={isDarkMode ? light.bg : dark.bg} />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: 'Poppins-Light',
                      fontSize: 15,
                      color: isDarkMode ? light.bg : dark.bg,
                    }}
                  >
                    Notifications Intervals
                  </Text>
                </View>
                <Picker
                  style={{
                    width: 140,
                    height: 40,
                    marginBottom: 4.3,
                  }}
                  selectedValue={this.state.selectedTriggerValue}
                  onValueChange={async itemValue => {
                    this.setState({ selectedTriggerValue: itemValue });
                    await AsyncStorage.setItem('triggerValue', itemValue.toString());
                  }}
                >
                  <Picker.Item label={15 + ' ' + 'min'} value="15" />
                  <Picker.Item label={30 + ' ' + 'min'} value="30" />
                  <Picker.Item label={1 + ' ' + 'day'} value="1" />
                  <Picker.Item label={2 + ' ' + 'day'} value="2" />
                </Picker>
              </View>

              <View style={[styles.settingsItem2, { paddingHorizontal: 20, marginTop: 20 }]}>
                <MaterialCommunityIcons name="account-outline" size={26} color={isDarkMode ? light.bg : dark.bg} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: 'Poppins-Light',
                      fontSize: 15,
                      color: isDarkMode ? light.bg : dark.bg,
                    }}
                  >
                    Author
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Light',
                      fontSize: 15,
                      color: isDarkMode ? light.bg : dark.bg,
                    }}
                  >
                    MRKD_1
                  </Text>
                </View>
              </View>

              <View style={[styles.settingsItem2, { paddingHorizontal: 20 }]}>
                <MaterialCommunityIcons name="information-outline" size={26} color={isDarkMode ? light.bg : dark.bg} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: 'Poppins-Light',
                      fontSize: 15,
                      color: isDarkMode ? light.bg : dark.bg,
                    }}
                  >
                    Version
                  </Text>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: 'Poppins-Light',
                      fontSize: 15,
                      color: isDarkMode ? light.bg : dark.bg,
                    }}
                  >
                    v{Constants.manifest.version}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      </ThemeContext.Consumer>
    );
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  settingsItem2: {
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  title: {
    paddingLeft: 20,
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 20,
  },
});
