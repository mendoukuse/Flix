import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import * as api from './api'
import ProgressiveImage from './ProgressiveImage'

const MovieCell = ({ movie }) => (
  <View style={styles.container}>
    <View style={styles.poster}>
      <ProgressiveImage
        style={styles.poster}
        resizeMode='contain'
        resizeMethod='resize'
        sourceHigh={{uri: api.getPosterUrlHigh(movie.poster_path) }}
        sourceLow={{uri: api.getPosterUrlLow(movie.poster_path) }}
      />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
      <Text style={styles.overview} numberOfLines={3}>{movie.overview}</Text>
    </View>
  </View>
)

MovieCell.propTypes = {
  movie: React.PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgb(99, 102, 70)',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'rgb(10, 78, 184)',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgb(0, 0, 0)',
  },
  overview: {
    fontSize: 12,
    color: 'rgb(150, 150, 150)',
  },
  poster: {
    marginRight: 10,
    width: 100,
    height: 100,
  }
})

export default MovieCell;
