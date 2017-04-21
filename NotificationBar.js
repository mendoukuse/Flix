import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Octicons';

function NotificationBar({ message, type }) {
  let icon = null;

  if (type === 'ALERT') {
    icon = (
      <Icon name='alert' size={16} color='#FFFFFF' style={{marginRight: 5}}/>
    );
  }
  return (
    <View style={styles.alert}>
      <View style={styles.alertText}>
        {icon}
        <Text style={styles.notification}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  alert: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    backgroundColor: '#512DA8',
  },
  alertText: {
    flexGrow: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  notification: {
    color: '#FFFFFF',
  }
});


export default NotificationBar;
