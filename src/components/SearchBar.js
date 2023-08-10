import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors, fonts} from '../constants';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';

const SearchBar = ({placeholder, value, onChangeText}) => {
  return (
    <View style={styles.searchBar}>
      <TouchableOpacity style={styles.iconBox}>
        <Icon name="search1" color={colors.darkGray} size={20} />
      </TouchableOpacity>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: scale(50),
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.regular,
    flex: 1,
    paddingLeft: 40,
    backgroundColor: colors.white,
    elevation: 3,
  },
  iconBox: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 1,
  },
});
