import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { colors, fonts } from '../constants';
import Tick from '../assets/images/svg/tick.svg';
import Cross from '../assets/images/svg/cross.svg';
import Feather from 'react-native-vector-icons/Feather';
const InputBox = ({
  Icon,
  error,
  onChangeText,
  value,
  placeholder,
  errorDisc,
  KT,
  editable,
  customStyle,
  customInputStyle,
  isEye,
  secureTextEntry,
  onEyePress,
  check
}) => {
  return (
    <View style={styles.inputBox}>
      <View style={styles.iconBox}>
        <Icon />
      </View>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[
          styles.textInput,
          { borderColor: value ? colors.primaryColor : '#F3F3F3' },
          customInputStyle,
        ]}
        keyboardType={KT ? KT : 'default'}
        secureTextEntry={secureTextEntry}
        editable={editable}
        check={check}
      />
      {value && !isEye && (
        
        <View style={styles.leftIconBox}>
          <Tick /> 
        </View>
      )} 
      {/* {check && !isEye && (
        <View style={styles.leftIconBox}>
          <Tick />
        </View>
      )}
      {!check || !isEye && (
        <View style={styles.leftIconBox}>
          <Cross />
        </View>
      )} */}



      {isEye && (
        <TouchableOpacity
          style={[styles.leftIconBox, { marginTop: -4 }]}
          onPress={onEyePress}>
          <Feather
            name={secureTextEntry ? 'eye-off' : 'eye'}
            color={'#B7B7B7'}
            size={20}
          />
        </TouchableOpacity>
      )}
      
      {error ? <Text style={styles.error}>This is required.</Text> : null}
      {errorDisc ? <Text style={styles.error}>{errorDisc}</Text> : null}
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  textInput: {
    height: scale(50),
    borderRadius: 15,
    marginBottom: 13,
    paddingLeft: 55,
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.regular,
    backgroundColor: '#F3F3F3',
    flex: 1,
    paddingRight: 45,
    borderWidth: 1,
  },
  iconBox: {
    width: 20,
    height: 20,
    resizeMode: 'center',
    position: 'absolute',
    zIndex: 1,
    left: 25,
    top: 19,
  },
  inputBox: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  leftIconBox: {
    position: 'absolute',
    zIndex: 1,
    right: 15,
    top: 18,
    height: scale(50),
  },
});
