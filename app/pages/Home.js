import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import Constants from 'expo-constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StatusBar } from "expo-status-bar";

import PupularMovieItem from '../components/PupularMovieItem';
import RecentMovieItem from '../components/RecentMovieItem';
import Movie from '../models/Movie';
import { ThemeContext } from "../contexts/ThemeContext";

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
                        poster_path: "http://image.tmdb.org/t/p/w342" + movie.poster_path,
                        backdrop_path: "http://image.tmdb.org/t/p/w500" + movie.backdrop_path,
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
                        poster_path: "http://image.tmdb.org/t/p/w342" + movie.poster_path,
                        backdrop_path: "http://image.tmdb.org/t/p/w500" + movie.backdrop_path,
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
            <ThemeContext.Consumer>
                {(context) => {
                    const { isDarkMode, light, dark } = context;
                    return (
                        <View style={[styles.container, { backgroundColor: isDarkMode ? dark.bg : light.bg }]}>
                            <StatusBar style={ isDarkMode ? "light" : "dark"}></StatusBar>
                            <View style={styles.header}> 
                                <Text style={[styles.title, { color: isDarkMode ? light.bg : dark.bg }]}>Movies</Text>                
                                <MaterialCommunityIcons name="magnify" size={24} color={isDarkMode ? light.bg : dark.bg}></MaterialCommunityIcons>
                            </View>
            
                            <ScrollView>
                                <View 
                                    style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, alignItems: "center", marginVertical: 10,}}>
                                        <Text style={{fontFamily: "Poppins-SemiBold", fontSize: 16, color: isDarkMode ? light.bg : dark.bg}}>Popular</Text>
                                        <View style={{flexDirection: "row", flexWrap: "wrap", alignItems: "center"}}>
                                            <Text style={{fontFamily: "Poppins-Bold", fontSize: 16, color: isDarkMode ? light.bg : dark.bg}}>View All</Text>
                                            <MaterialCommunityIcons name="chevron-right" size={30} color={isDarkMode ? light.bg : dark.bg}/>
                                        </View>
                                </View>
            
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <View style={{flexDirection: "row", flex: 1, paddingLeft: 10}}>
                                        {
                                            this.state.popularMovies.map((item, index) => {
                                                return index < 5 ? ( <PupularMovieItem key={item.id} item={item} context={context} /> ) : ( <View key={item.id} /> );
                                                })
                                        }
                                    </View>
                                </ScrollView>
            
                                <View 
                                    style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, alignItems: "center", marginBottom: 10,}}>
                                        <Text style={{fontFamily: "Poppins-SemiBold", fontSize: 16, color: isDarkMode ? light.bg : dark.bg}}>Recent</Text>
                                        <View style={{flexDirection: "row", flexWrap: "wrap", alignItems: "center"}}>
                                            <Text style={{fontFamily: "Poppins-Bold", fontSize: 16, color: isDarkMode ? light.bg : dark.bg}}>View All</Text>
                                            <MaterialCommunityIcons name="chevron-right" size={30} color={isDarkMode ? light.bg : dark.bg}/>
                                        </View>
                                </View>
            
                                
                                <View style={{paddingHorizontal: 20}}>
                                    {
                                        this.state.recentMovies.map((item, index) => {
                                            return index < 5 ? ( <RecentMovieItem key={item.id} item={item} context={context} /> ) : ( <View key={item.id} /> );
                                        })
                                    }
                                </View>
                                
            
                            </ScrollView>
                        </View>
                    )
                }}
            </ThemeContext.Consumer>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + 10,
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