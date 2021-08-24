import React from "react";
import { View, Text, Image } from "react-native";

function CastItem(props) {
  const { isDarkMode, light, dark } = props.context;

  return (
    <View style={{ marginRight: 10, flexDirection: "row", marginVertical: 10 }}>
      <Image
        style={{ width: 64, height: 64, borderRadius: 24 }}
        source={{ uri: props.cast.profile_path }}
      ></Image>
      <View
        style={{
          flexDirection: "column",
          flexWrap: "wrap",
          justifyContent: "center",
          marginLeft: 10,
        }}
      >
        <Text
          style={{
            color: isDarkMode ? light.bg : dark.bg,
            fontFamily: "Poppins-Light",
          }}
        >
          {props.cast.name}
        </Text>
        <Text
          style={{
            color: isDarkMode ? light.bg : dark.bg,
            fontFamily: "Poppins-Light",
            fontSize: 12,
          }}
        >
          {props.cast.character}
        </Text>
      </View>
    </View>
  );
}

export default CastItem;
