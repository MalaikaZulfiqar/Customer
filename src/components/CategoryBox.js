import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import img from '../assets/images/png/cleaning.png';
import {colors, fonts} from '../constants';
const CategoryBox = ({boxName, img, bg}) => {
  return (
    <View style={styles.categoryBox}>
      <View style={[styles.box, {backgroundColor: bg}]}>
        <Image source={{uri:img}} style={styles.img} />
      </View>
      <Text style={styles.boxText}>{boxName}</Text>
    </View>
  );
};
export default CategoryBox;

const styles = StyleSheet.create({
  box: {
    width: scale(70),
    height: scale(70),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: colors.black,
    marginTop: 10,
    // textAlign: 'center',
  },
  img: {
    width: 35,
    height: 35,
    resizeMode: 'center',
  },
  categoryBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
});
