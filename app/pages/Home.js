import React, { Component } from 'react'
import { SafeAreaView, View, StyleSheet, ScrollView, Text } from 'react-native'
import Constants from 'expo-constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MovieItem from '../components/MovieItem';
import Movie from '../models/Movie';

export default class Home extends Component {

    _isMount = false;

    genres = [];

    state = {
        isLoading: false,
        recentMovies: [],
        popularMovies: [],
    };

    constructor(props) {
        super(props);
        this.genres = props.genres;
    }

    componentDidMount() {
        this._isMount = true;

        return fetch('https://api.themoviedb.org/3/movie/popular?api_key=6269ca319ffc8277bdd7de26a3894f6e')
        .then((response) => response.json())
        .then((responseJson) => {
            const data = [];
            var allgenres = this.genres;
            responseJson.results.forEach((movie) => {
                movie.genres = []
                movie.genre_ids.forEach(genreid => {
                    var genreData = allgenres.filter(x => x.id == genreid)
                    if(genreData.length != 0) {
                        movie.genres.push(genreData[0].name)
                    }
                })

                data.push(
                    new Movie({
                        id: movie.id,
                        title: movie.title,
                        poster_path: movie.poster_path,
                        backdrop_path: movie.backdrop_path,
                        genre_ids: movie.genre_ids,
                        overview: movie.overview,
                        popularity: movie.popularity,
                        release_date: movie.release_date,
                        vote_average: movie.vote_average,
                        vote_count: movie.vote_count,
                        genres: movie.genres,
                    })
                );
            });

            this.setState({
                popularMovies: data,
            });
        })
        .catch((error) => console.error(error));
    }
    
    componentWillUnmount() {
        this._isMount = false;
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}> 
                    <Text style={styles.title}>Popular Movies</Text>
                    <MaterialCommunityIcons name="magnify" size={24}></MaterialCommunityIcons>
                </View>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{flexDirection: "row", flex: 1, paddingLeft: 10}}>
                        {
                            this.state.popularMovies.map((item, index) => {
                                return index < 4 ? ( <MovieItem key={item.id} item={item} /> ) : ( <View key={item.id} /> );
                                })
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        paddingVertical: 20,
    },

    header: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginBottom: 10,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        
    },
});