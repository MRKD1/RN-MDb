import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { ThemeContext } from '../contexts/ThemeContext';

function ChipGroup(props) {
  const { isDarkMode, light, dark } = props.context;
  return (
    <View style={styles.itemGroup}>
      {props.datas.map((item, index) => {
        return (
          <View style={[styles.chipItem, { borderColor: isDarkMode ? light.bg : '#0E0E0E' }]} key={index}>
            <Text style={{ color: isDarkMode ? light.bg : '#222', fontFamily: 'Poppins-Regular', fontSize: 11 }}>{item}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  itemGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipItem: {
    borderColor: '#444',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 16,
    marginTop: 5,
  },
});

export default ChipGroup;
