import React from 'react';
import { View, StyleSheet, Text, Image } from "react-native";
import PagerView from "react-native-pager-view";
import Constants from 'expo-constants';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import DotIndicator from "../components/DotIndicator";

function AppIntro(props) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <View style={styles.container}>
            <PagerView style={styles.pagerView} onPageSelected={(e) => setSelectedIndex(e.nativeEvent.position)} initialPage={0}>
                <View key="1" style={styles.page}>
                    <Text style={styles.title}>SSSSSSSSSSSSSSS</Text>
                    <View style={styles.circle}>
                        <Image style={{ width: 48, height: 48, tintColor: "white" }} source={require("./../assets/data.png")}></Image>
                    </View>
                    <Text style={styles.subtitle}>SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS</Text>
                </View>

                <View key="2" style={styles.page}>
                    <Text style={styles.title}>DDDDDDDDDDD</Text>
                    <View style={styles.circle}>
                        <Image style={{ width: 48, height: 48, tintColor: "white" }} source={require("./../assets/movies.png")}></Image>
                    </View>
                    <Text style={styles.subtitle}>DDDDDDDDDDDDDDDDDDD</Text>
                </View>

                <View key="3" style={styles.page}>
                    <Text style={styles.title}>WWWWWWWWWW</Text>
                    <View style={styles.circle}>
                        <Image style={{ width: 48, height: 48, tintColor: "white" }} source={require("./../assets/translate.png")}></Image>
                    </View>
                    <Text style={styles.subtitle}>WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW</Text>
                </View>

                <View key="4" style={styles.page}>
                    <Text style={styles.title}>QQQQQQQQQQQ</Text>
                    <View style={styles.circle}>
                        <Image style={{ width: 48, height: 48, tintColor: "white" }} source={require("./../assets/moonmode.png")}></Image>
                    </View>
                    <Text style={styles.subtitle}>QQQQQQQQQQQQQQQQQQQQQQQ</Text>
                </View>

                <View key="5" style={styles.page}>
                    <Text style={styles.title}>RRRRRRRRRR</Text>
                    <View style={styles.circle}>
                        <Image style={{ width: 48, height: 48, tintColor: "white" }} source={require("./../assets/notification.png")}></Image>
                    </View>
                    <Text style={styles.subtitle}>RRRRRRRRRRRRRRRRRRRRRR</Text>

                    <TouchableWithoutFeedback 
                        onPress={async () => { 
                            await AsyncStorage.setItem("isFirstRun", "false"); 
                            props.navigation.navigate("Main");
                        }}
                    >
                        <View style={styles.button}>
                            <Text style={{ color: "white", fontFamily: "Poppins-Light" }}>KLIK</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </PagerView>

            <View> style={{position: "absolute", bottom: 50, width: "100%", alignItems: "center"}}
                <DotIndicator activeIndex={selectedIndex} dotSize={8} itemLength={5}></DotIndicator>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + 10,
        backgroundColor: "white",
    },
    pagerView: {
        flex: 1,
    },
    page: {
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
    },
    title: {
        fontFamily: "Poppins-SemiBold", 
        fontSize: 20,
        marginBottom: 20,
    },
    circle: {
        width: 144,
        height: 144,
        borderRadius: 72,
        backgroundColor: "#B1B1B1",
        justifyContent: "center", 
        alignItems: "center"
    },
    subtitle: {
        fontFamily: "Poppins-Light",
        fontSize: 16,
        paddingHorizontal: 20,
        textAlign: "center",
        marginTop: 40,
    },
    button: {
        backgroundColor: "black",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
    },

})
