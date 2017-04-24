import React from 'react';
import {
  Navigator,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Movies from './Movies';
import MovieDetails from './MovieDetails';
import NetworkIndicator from './NetworkIndicator';

const NavMovies = ({ type, onNavChange }) => (
  <View style={{ flex: 1 }}>
    <NetworkIndicator />

    <Navigator
      initialRoute={{ key: 'movies' }}
      renderScene={(route, navigator) => {
        onNavChange(navigator);
        let mainComponent = null;
        if (route.key === 'movies') {
          return <Movies type={type} onSelectMovie={movie => navigator.push({ key: 'details', movie })} />
        } else {
          return <MovieDetails movie={route.movie} />;
        }
      }}
      configureScene={() => Navigator.SceneConfigs.HorizontalSwipeJump }
      navigationBar={
        <Navigator.NavigationBar
          routeMapper={{
            LeftButton: (route, navigator) => {
              if (route.key === 'movies') return null
              return (
                <TouchableOpacity onPress={() => navigator.pop()}>
                  <View style={{ flexGrow: 1, alignItems: 'center', flexDirection: 'row' }}>
                    <Icon name='chevron-left' size={14} />
                    <Text style={{ fontSize: 10 }}>Back</Text>
                  </View>
                </TouchableOpacity>
              );
            },
            RightButton: () => {},
            Title: () => {},
          }}
          style={{ height: 15, marginTop: Platform.OS === 'android' ? 0 : -20 }}
        />
      }
    />

  </View>
)

NavMovies.propTypes = {
  type: React.PropTypes.oneOf(['NOW_PLAYING', 'TOP_RATED']).isRequired,
  onNavChange: React.PropTypes.func,
};

export default NavMovies;
