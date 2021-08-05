import React, { Component } from 'react'
import { SafeAreaView, View, StyleSheet, ScrollView, Text } from 'react-native'
import Constants from 'expo-constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import PupularMovieItem from '../components/PupularMovieItem';
import RecentMovieItem from '../components/RecentMovieItem';
import Movie from '../models/Movie';

export default class Home extends Component {

    _isMount = false;
    genres = [];
    baseUrl = "https://api.themoviedb.org/3/movie/";
    apiKey = "6269ca319ffc8277bdd7de26a3894f6e";

    state = {
        isLoading: false,
        recentMovies: [],
        popularMovies: [],
        recentMovies: [],
    };

    constructor(props) {
        super(props);
        this.genres = props.genres;
    }

    componentDidMount() {
        this._isMount = true;

        return fetch(this.baseUrl + "popular?api_key=" + this.apiKey)
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

            if(this._isMount) {
                this.setState({
                    popularMovies: data,
                });
            }

            fetch(this.baseUrl + "now_playing?api_key=" + this.apiKey)
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

            if(this._isMount) {
                this.setState({
                    recentMovies: data,
                });
            }
                })
                .catch((error) => console.error(error));
            
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
                    <Text style={styles.title}>Movies</Text>                
                    <MaterialCommunityIcons name="magnify" size={24}></MaterialCommunityIcons>
                </View>

                <ScrollView>
                    <View 
                        style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, alignItems: "center", marginVertical: 10,}}>
                            <Text style={{fontFamily: "Poppins-SemiBold", fontSize: 16}}>Popular</Text>
                            <View style={{flexDirection: "row", flexWrap: "wrap", alignItems: "center"}}>
                                <Text style={{fontFamily: "Poppins-Bold", fontSize: 16}}>View All</Text>
                                <MaterialCommunityIcons name="chevron-right" size={30} />
                            </View>
                    </View>

                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{flexDirection: "row", flex: 1, paddingLeft: 10}}>
                            {
                                this.state.popularMovies.map((item, index) => {
                                    return index < 5 ? ( <PupularMovieItem key={item.id} item={item} /> ) : ( <View key={item.id} /> );
                                    })
                            }
                        </View>
                    </ScrollView>

                    <View 
                        style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, alignItems: "center", marginBottom: 10,}}>
                            <Text style={{fontFamily: "Poppins-SemiBold", fontSize: 16}}>Recent</Text>
                            <View style={{flexDirection: "row", flexWrap: "wrap", alignItems: "center"}}>
                                <Text style={{fontFamily: "Poppins-Bold", fontSize: 16}}>View All</Text>
                                <MaterialCommunityIcons name="chevron-right" size={30} />
                            </View>
                    </View>

                    
                    <View style={{paddingHorizontal: 20}}>
                        {
                            this.state.recentMovies.map((item, index) => {
                                return index < 5 ? ( <RecentMovieItem key={item.id} item={item} /> ) : ( <View key={item.id} /> );
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
    },

    title: {
        fontSize: 24,
        fontFamily: "Poppins-SemiBold",
        
    },
});