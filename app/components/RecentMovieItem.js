import React from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";


function RecentMovieItem(props) {

    const navigation = useNavigation();
    const deviceWidth = Dimensions.get("window").width;
    const _width = (deviceWidth - 50 - 171);

    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('MovieDetails', {item: props.item })}> 
            <View style={[styles.item, {backgroundColor: props.context.isDarkMode ? "#3f3d43" : "#dcdbde"}]}>
                <Image style={styles.poster} source={{uri: props.item.poster_path}}></Image>
                <View style={{marginLeft: 10, width: _width, left: 20,}}>
                    <Text style={{width: 171, fontFamily: "Poppins-SemiBold", fontSize: 17, marginTop: 10, color: props.context.isDarkMode ? props.context.light.bg : props.context.dark.bg}}>{props.item.title}</Text> 
                    <Text style={{fontFamily: "Poppins-Light", fontSize: 13, color: "#FFBC03", }}>
                        {props.item.genres.find((genre) => genre[0] )}

                    </Text>
                    <Text style={{fontFamily: "Poppins-Light", fontSize: 13, color: props.context.isDarkMode ? props.context.light.bg : props.context.dark.bg, marginTop: 5}}>{props.item.release_date}</Text>
                    <View style={{backgroundColor: "#FFBC03", width: 30, height: 30, alignItems: "center", justifyContent: "center", borderRadius: 10, marginTop: 10}}>
                        <Text style={{fontFamily: "Poppins-SemiBold", alignItems: "center", fontSize: 14, marginTop: 3, color: "#303133"}}>{props.item.vote_average}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        borderRadius: 10,
        marginBottom: 10,
        //backgroundColor: props.context.isDarkMode ? "#3f3d43" : "#dcdbde",
        height: 160,
        marginVertical: 50,

    },

    poster: {
        width: 114,
        height: 170.33,
        borderRadius: 10,
        marginBottom: 10,
        bottom: 35,
        left: 20,
        

    },
});

export default RecentMovieItem;