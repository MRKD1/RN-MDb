import React from 'react';
import { View, StyleSheet, Text} from "react-native";

function ChipGroup(props) {
    return (
        <View style={styles.itemGroup}>
            {
                props.datas.map((item, index) => {
                    return(
                        <View style={styles.chipItem} key={index}>
                            <Text style={{color: "white", fontSize: 13,}}>{item}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

const styles = StyleSheet.create({
    itemGroup: {
        flexDirection: "row",
        flexWrap: "wrap",

    },
    chipItem: {
        backgroundColor: "#333",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
        borderRadius: 16,
        marginTop: 5,
    },
});

export default ChipGroup;