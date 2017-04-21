import React, { Component } from 'react';
import {
  Text,
  Platform,
  BackAndroid,
} from 'react-native';

import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';

import NavMovies from './NavMovies';

class TabApp extends Component {
  componentDidMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onHardwareBackPress);
    }
  }

  onHardwareBackPress = () => {
    if (this.currentTab === 0 && this.navRefs.nowPlaying &&
        this.navRefs.nowPlaying.getCurrentRoutes().length > 1) {
      this.navRefs.nowPlaying.pop();
      return true;
    } else if (this.currentTab === 1 && this.navRefs.topRated &&
               this.navRefs.topRated.getCurrentRoutes().length > 1) {
      this.navRefs.topRated.pop();
      return true;
    }
    return false;
  }

  componenWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onHardwareBackPress);
    }
  }

  navRefs = {}

  currentTab = 0

  render() {
    return (
      <ScrollableTabView
        locked
        style={{ marginTop: 20 }}
        onChangeTab={({ i }) => (this.currentTab = i)}
        renderTabBar={() => <DefaultTabBar />}
      >
        <NavMovies
          tabLabel='Now Playing'
          type={'NOW_PLAYING'}
          onNavChange={nav => (this.navRefs.nowPlaying = nav)}
        />
        <NavMovies
          tabLabel='Top Rated'
          type={'TOP_RATED'}
          onNavChange={nav => (this.navRefs.topRated = nav)}
        />
      </ScrollableTabView>
    );
  }
}

export default TabApp;
