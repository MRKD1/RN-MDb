import React from 'react';
import { View, Text, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';

function TrailerItem(props) {
  const deviceWidth = Dimensions.get('window').width;
  const posterWidth = (deviceWidth - 50) / 1.2;
  const leftPosition = (deviceWidth - 50 - 24) / 2;
  const marginValue = props.itemIndex % 2 == 0 ? 10 : 0;

  const { isDarkMode, light, dark } = props.context;

  const thumbnail = 'https://img.youtube.com/vi/' + props.data.key + '/hqdefault.jpg';

  return (
    <TouchableWithoutFeedback onPress={props.onPressFunction}>
      <View style={{ marginRight: 5, marginTop: 10, paddingLeft: 33 }}>
        <Image
          style={{
            position: 'absolute',
            top: 60,
            left: leftPosition,
            zIndex: 1,
            width: 40,
            height: 40,
          }}
          source={require('../assets/play.png')}
        ></Image>
        <Image
          resizeMode={'cover'}
          style={{
            width: posterWidth,
            height: 160,
            borderRadius: 8,
            marginBottom: 5,
          }}
          source={{ uri: thumbnail }}
        ></Image>
        <Text
          style={{
            flexWrap: 'wrap',
            width: posterWidth,
            fontSize: 12,
            fontFamily: 'Poppins-SemiBold',
            color: isDarkMode ? light.bg : dark.bg,
          }}
          numberOfLines={2}
        >
          {props.data.name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default TrailerItem;
