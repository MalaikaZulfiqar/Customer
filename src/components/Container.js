import {StyleSheet, Text, View, StatusBar, Platform} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
const Container = ({children, customStyle}) => {
  return <View style={[styles.container, customStyle]}>{children}</View>;
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight : 0,
    paddingHorizontal: scale(15),
  },
});
