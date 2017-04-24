import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';

import * as api from './api'
import ProgressiveImage from './ProgressiveImage';

const LANDSCAPE = 'landscape';
const PORTRAIT = 'portrait;'

class MovieDetails extends Component {
  static propTypes = {
    movie: React.PropTypes.object.isRequired,
  }

  state = {}

  render() {
    const { movie } = this.props;
    const { width, height, orientation } = this.state;
    let posterStyles = [styles.backdrop, { width }];
    let imagePath = movie.backdrop_path;
    let containerOverrides = {};
    let resizeMethod = 'cover';

    if (orientation === LANDSCAPE) {
      posterStyles = [styles.poster, { height }];
      imagePath = movie.poster_path;
      containerOverrides = { flexDirection: 'row' };
      resizeMethod = 'contain'
    }

    return (
      <View
        style={[styles.container, containerOverrides]}
        onLayout={({ nativeEvent }) => {
          const { width, height } = nativeEvent.layout;
          const orientation = width > height ? LANDSCAPE : PORTRAIT;
          this.setState({
            width: width - 32, // to account for padding and border
            height: height - 32,
            orientation
          });
        }}
      >
        <View>
          <ProgressiveImage
            style={posterStyles}
            resizeMode={resizeMethod}
            resizeMethod='resize'
            sourceHigh={{uri: api.getPosterUrlHigh(imagePath) }}
            sourceLow={{uri: api.getPosterUrlLow(imagePath) }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.overview}>{movie.overview}</Text>
          <Text style={styles.releaseDate}>Released on: {movie.release_date}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(0, 0, 0)',
    marginBottom: 5,
  },
  overview: {
    fontSize: 14,
    color: 'rgb(150, 150, 150)',
    marginBottom: 5,
  },
  backdrop: {
    marginBottom: 10,
    width: 300,
    height: 200,
  },
  poster: {
    marginRight: 10,
    width: 200,
    height: 200,
  },
  releaseDate: {
    fontSize: 12,
    color: '#212121',
  }
});

export default MovieDetails;
