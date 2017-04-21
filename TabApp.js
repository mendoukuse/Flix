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
    if (this.currentTab === 0 && this.navRef && this.navRef.getCurrentRoutes().length > 1) {
      this.navRef.pop();
      return true;
    }
    return false;
  }

  componenWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onHardwareBackPress);
    }
  }

  navRef = null

  currentTab = 0

  render() {
    return (
      <ScrollableTabView
        locked
        style={{ marginTop: 20 }}
        onChangeTab={({ i }) => (this.currentTab = i)}
        renderTabBar={() => <DefaultTabBar />}
      >
        <NavMovies tabLabel='Now Playing' onNavChange={nav => (this.navRef = nav)} />
        <Text tabLabel='Top Rated'>Top Rated</Text>
      </ScrollableTabView>
    );
  }
}

export default TabApp;
