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
    NetInfo.addEventListener('change', this.handleConnectionInfoChange);
    NetInfo.isConnected.fetch().then((isConnected) => {
      if (!isConnected) {
        this.setState({ visible: true, message: 'Network offline' });
      }
    }).catch((error) => {});
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('change', this.handleConnectionInfoChange);
  }

  handleConnectionInfoChange = (connectionInfo) => {
    const isConnected = connectionInfo.toLowerCase() != 'none';

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
