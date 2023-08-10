import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {colors} from '../constants';
const ArrowBox = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.box} onPress={onPress}>
      <Icon name="arrow-right" color={colors.black} size={20} />
    </TouchableOpacity>
  );
};

export default ArrowBox;

const styles = StyleSheet.create({
  box: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
