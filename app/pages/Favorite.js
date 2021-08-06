import React, { Component } from 'react'
import { SafeAreaView, Text, StyleSheet } from 'react-native'
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("movie.db");

export default class Favorite extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            test: null,
        };
        this.fetchSqliteData();
    }

    fetchSqliteData() {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM Favorites",
                null,
                (txObj, { rows: { _array} }) => {
                    this.setState({ data: _array });
                },
                (txObj, error) => console.error(error)
            );
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Favorite</Text>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});