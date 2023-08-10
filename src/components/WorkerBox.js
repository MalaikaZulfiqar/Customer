import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Rating from '../assets/images/svg/rating.svg';
import Bookmark from '../assets/images/svg/bookmark.svg';
import {colors, fonts} from '../constants';
import globalStyles from '../styles/globalStyles';
import {useNavigation} from '@react-navigation/native';
const WorkerBox = ({img, off, workerName, rating, charges, onPress}) => {
  const navigation = useNavigation();
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image style={styles.img} source={img} />
      <View
        style={{
          flex: 1,
          marginLeft: 10,
          justifyContent: 'space-between',
          height: scale(70),
        }}>
        <View>
          <View style={globalStyles.justifyBtwRow}>
            <Text style={globalStyles.font16R}>{workerName}</Text>
            {off && (
              <Text style={[globalStyles.font14, {color: colors.primaryColor}]}>
                Off {`${off}`}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.bottomBox}>
          <View style={[styles.smBox, {backgroundColor: '#FFF8E5'}]}>
            <Rating />
            <Text style={[globalStyles.font14, {marginTop: 3, marginLeft: 5}]}>
              {rating}
            </Text>
          </View>
          <View style={[styles.smBox, {backgroundColor: '#EFEEFF'}]}>
            <Text
              style={[
                globalStyles.font14,
                {marginTop: 3, marginLeft: 5, fontFamily: fonts.bold},
              ]}>
              $ {`${charges}`}/h
            </Text>
          </View>
          <TouchableOpacity
            style={{alignItems: 'flex-end', flex: 1}}
            onPress={() => {
              navigation.navigate('Saved');
            }}>
            <Bookmark />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};

export default WorkerBox;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
    alignSelf: 'center',
  },
  img: {
    height: scale(70),
    width: scale(70),
    resizeMode: 'center',
  },
  smBox: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    marginRight: 15,
  },
  bottomBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
