import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import Constants from "expo-constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import YoutubePlayer from "react-native-youtube-iframe";

import ChipGroup from "../components/ChipGroup";
import Trailer from "../models/Trailer";
import TrailerItem from "../components/TrailerItem";

class MovieDetails extends Component {
  movieItem = null;
  constructor(props) {
    super(props);
    this.movieItem = props.route.params.item;
  }

  state = {
    trailer: [],
    activeMovieTrailerKey: "",
    modalVisible: false,
  };

  componentDidMount() {
    return fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.movieItem.id +
        "/videos?api_key=6269ca319ffc8277bdd7de26a3894f6e"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        var items = [];
        responseJson.results.map((movie) => {
          items.push(
            new Trailer({
              key: movie.key,
              name: movie.name,
              type: movie.type,
            })
          );
        });

        this.setState({ trailer: items });
      })
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <View stile={styles.container}>
        <Modal
          style={{ position: "absolute", top: 0 }}
          animationType="slide"
          transparent={true}
          statusBarTranslucent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#000",
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => this.setState({ modalVisible: false })}
            >
              <View
                style={{
                  backgroundColor: "#222",
                  width: 48,
                  height: 48,
                  position: "absolute",
                  top: Constants.statusBarHeight + 10,
                  justifyContent: "center",
                  alignItems: "center",
                  left: 20,
                  borderRadius: 10,
                }}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={30}
                  color={"white"}
                ></MaterialCommunityIcons>
              </View>
            </TouchableWithoutFeedback>

            <View style={{ width: "100%" }}>
              <YoutubePlayer
                style={{}}
                play={true}
                height={300}
                videoId={this.state.activeMovieTrailerKey}
              />
            </View>
          </View>
        </Modal>
        <ScrollView>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.pop()}>
            <MaterialCommunityIcons
              style={{
                position: "absolute",
                top: Constants.statusBarHeight + 20,
                left: 20,
                zIndex: 1,
                paddingRight: 20,
                paddingBottom: 20,
              }}
              name="chevron-left"
              size={30}
              color={"#fff"}
            />
          </TouchableWithoutFeedback>

          <Image
            style={styles.poster}
            resizeMode={"cover"}
            source={{
              uri:
                "http://image.tmdb.org/t/p/w500" + this.movieItem.backdrop_path,
            }}
          ></Image>

          <View style={{ flex: 1, padding: 20 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <View style={{ flexWrap: "wrap", flexDirection: "column" }}>
                <Text style={styles.title}>{this.movieItem.title}</Text>
                <Text>{this.movieItem.release_date}</Text>
              </View>

              <View
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: "white",
                  borderRadius: 24,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>{this.movieItem.vote_average}</Text>
              </View>
            </View>
            <ChipGroup datas={this.movieItem.genres}></ChipGroup>
            <Text style={styles.header}>Overview</Text>
            <Text>{this.movieItem.overview}</Text>
            <Text style={styles.header}>Trailers</Text>
            <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
              {this.state.trailer.map((item, index) => {
                return (
                  <TrailerItem
                    key={item.key}
                    poster={this.movieItem.backdrop_path}
                    onPressFunction={() =>
                      this.setState({ modalVisible: true, activeMovieTrailerKey: item.key, })
                    }
                    data={item}
                    modalVisible={this.modalVisible}
                    itemIndex={index}
                  ></TrailerItem>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },

  poster: {
    height: 281,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default MovieDetails;
