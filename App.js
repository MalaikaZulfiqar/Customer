import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import PhoneInput from 'react-native-phone-number-input';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/navigation';
import RNBootSplash from 'react-native-bootsplash';
import { requestUserPermission,NotificationListner } from './src/utils/pushnotification_helper';
const App = () => {
  useEffect(() => {
    requestUserPermission();
    NotificationListner();
    const HideSplash = async () => {
      await RNBootSplash.hide({fade: true, duration: 500});
    };
    HideSplash();
  }, []);
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
