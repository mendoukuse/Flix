import React, { Component, PropTypes } from 'react';
import {
  View,
  ListView,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import * as api from './api';

import MovieCell from './MovieCell';

class Movies extends Component {
  static propTypes = {
    onSelectMovie: PropTypes.func.isRequired,
  }

  state = {
    isLoading: false,
    isEmpty: false,
    dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.setState({ isLoading: true })
    api.fetchMovies()
      .then(movies => this.updateRows(movies))
      .catch((error) => {
        this.setState({ isLoading: false })
        console.error(error)
      });
  }

  updateRows(rows) {
    this.setState({
      isLoading: false,
      isEmpty: rows.length === 0,
      dataSource: this.state.dataSource.cloneWithRows(rows)
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={[styles.container, styles.centering]}>
          <ActivityIndicator />
        </View>
      );
    } else if (this.state.isEmpty) {
      return (
        <View style={[styles.container, styles.centering]}>
          <Text>No results found.</Text>
        </View>
      );
    }
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={movie => (
          <TouchableOpacity onPress={() => this.props.onSelectMovie(movie) }>
            <MovieCell movie={movie} />
          </TouchableOpacity>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centering: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Movies;
