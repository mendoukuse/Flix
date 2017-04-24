import React, { Component } from 'react';
import {
  NetInfo,
  View,
} from 'react-native';

import NotificationBar from './NotificationBar';

class NetworkIndicator extends Component {
  state = {
    visible: false,
    message: '',
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('change', this.handleConnectionInfoChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this.handleConnectionInfoChange);
  }

  handleConnectionInfoChange = (isConnected) => {
    this.setState({
      visible: !isConnected,
      message: isConnected ? '' : 'Network offline',
    });
  }

  render() {
    const message = this.state.message;

    return (
      <View>
        {this.state.visible ? (
          <NotificationBar type='ALERT' message={message} />
        ) : null}
      </View>
    );
  }
}

export default NetworkIndicator;
