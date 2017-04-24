import React, { Component, PropTypes } from 'react';
import {
  View,
  ListView,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import * as api from './api';

import MovieCell from './MovieCell';
import NotificationBar from './NotificationBar';

class Movies extends Component {
  static propTypes = {
    onSelectMovie: PropTypes.func.isRequired,
    type: React.PropTypes.oneOf(['NOW_PLAYING', 'TOP_RATED']).isRequired,
  }

  state = {
    isLoading: false,
    isEmpty: false,
    networkError: false,
    refreshing: false,
    dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
  }

  componentDidMount() {
    const { type } = this.props;
    this.fetchMovies(type);
  }

  fetchMovies() {
    const { type } = this.props;
    this.setState({
      isLoading: true,
      networkError: false,
    })
    return api.fetchMovies(type)
      .then(movies => this.updateRows(movies))
      .catch((error) => {
        this.setState({
          isLoading: false,
          networkError: true,
        });
      });
  }

  updateRows(rows) {
    this.setState({
      isLoading: false,
      isEmpty: rows.length === 0,
      refreshing: false,
      dataSource: this.state.dataSource.cloneWithRows(rows)
    });
  }

  onRefresh() {
    const { type } = this.props;
    this.setState({
      refreshing: true,
      networkError: false,
    });
    api.fetchMovies(type)
      .then((movies) => this.updateRows(movies))
      .catch((error) => {
        this.setState({
          refreshing: false,
          networkError: true,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={[styles.container, styles.centering]}>
          <ActivityIndicator color='#512DA8' size='large' />
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
      <View style={styles.container}>
        {this.state.networkError && (
          <TouchableOpacity onPress={() => this.setState({ networkError: false })}>
            <NotificationBar message={'Network Error'} type='ALERT' color='#D32F2F'/>
          </TouchableOpacity>
        )}
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={movie => (
            <TouchableOpacity onPress={() => this.props.onSelectMovie(movie) }>
              <MovieCell movie={movie} />
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
              colors={['#512DA8', '#673AB7', '#536DFE']}
            />
          }
        />
      </View>
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
  },
});

export default Movies;
