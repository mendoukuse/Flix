import React from 'react';
import Movies from './Movies';
import {
  Navigator,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const navBarHeight = 60;
const navBarStyle = {
  height: navBarHeight,
  backgroundColor: 'rgb(250, 117, 96)'
};

const NavMovies = ({ onNavChange }) => (
  <Navigator
    style={{ paddingTop: navBarHeight }}
    initialRoute={{ key: 'movies' }}
    renderScene={(route, navigator) => {
      onNavChange(navigator);
      if (route.key === 'movies') {
        return <Movies onSelectMovie={movie => navigator.push({ key: 'details', movie })} />
      } else {
        return (
          <View style={{ flex: 1, backgroundColor: 'rgb(230, 230, 232)' }}>
            <Text>Details view</Text>
            <Text>{route.movie.title}</Text>
          </View>
        );
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
                <Text>Back</Text>
              </TouchableOpacity>
            )
          },
          RightButton: () => {},
          Title: (route) => {
            if (route.key === 'movies') {
              return <Text>Now Playing</Text>
            }
            return null
          },
        }}
        style={navBarStyle}
      />
    }
  />
)

NavMovies.propTypes = {
  onNavChange: React.PropTypes.func,
};

export default NavMovies;
