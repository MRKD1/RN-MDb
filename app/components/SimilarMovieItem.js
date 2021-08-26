import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function SimilarMovieItem(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('MovieDetails', { item: props.item })}>
      <View style={styles.item}>
        <Image style={styles.poster} source={{ uri: props.item.poster_path }}></Image>
        <Text
          style={{
            width: 171,
            fontFamily: 'Poppins-SemiBold',
            fontSize: 14,
            color: props.context.isDarkMode ? props.context.light.bg : props.context.dark.bg,
          }}
        >
          {props.item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    marginRight: 10,
    justifyContent: 'flex-start',

    //marginLeft: 10,
  },

  poster: {
    width: 171,
    height: 255.5,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default SimilarMovieItem;
