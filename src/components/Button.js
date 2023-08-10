import React from 'react';
import {Pressable, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {colors, fonts} from '../constants';
import {scale} from 'react-native-size-matters';
const Button = ({
  onPress,
  btnName,
  disabled,
  loading,
  customStyle,
  customText,
  style
}) => {
  return (
    <Pressable
      disabled={disabled}
      style={[
        styles.btn,
        {backgroundColor: disabled ? colors.disableColor : colors.btnColor},
        customStyle,
      ]}
      onPress={() => {
        onPress();
      }}>
      {loading && <ActivityIndicator size={25} color={'#fff'} />}
      {!loading && <Text style={[styles.btnText, customText]}>{btnName}</Text>}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    borderRadius: 15,
    height: scale(49),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnText: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 16,
  },
});
