import React from 'react';
import { View, Text, Image } from 'react-native';

function CastItem(props) {
  const { isDarkMode, light, dark } = props.context;

  return (
    <View style={{ flex: 1, marginRight: 20 }}>
      <Image source={{ uri: props.cast.profile_path }} style={{ height: 120, width: 80, borderRadius: 10 }} />
      <Text
        style={{
          color: isDarkMode ? light.bg : dark.bg,
          fontFamily: 'Poppins-SemiBold',
          width: 80,
          fontSize: 12,
        }}
        numberOfLines={2}
      >
        {props.cast.name}
      </Text>
      <Text
        style={{
          color: isDarkMode ? light.bg : dark.bg,
          fontFamily: 'Poppins-Light',
          fontSize: 10,
          width: 80,
        }}
        numberOfLines={2}
      >
        {props.cast.character}
      </Text>
    </View>
  );
}

export default CastItem;
