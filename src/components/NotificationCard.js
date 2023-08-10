import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import Rating from '../assets//images/svg/rating.svg';
import {colors, fonts} from '../constants';
import globalStyles from '../styles/globalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign'

const NotificationCard = ({img, title, favorite, categoryName, rating, charges, onPress,created,description}) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image style={styles.img} source={{uri:img}} />
      <View
        style={{
          flex: 1,
          marginLeft: 10,
          justifyContent: 'space-between',
          height: scale(100),
        }}>
        <View>
          <View style={globalStyles.justifyBtwRow}>
            <Text
              numberOfLines={1}
              style={[globalStyles.font16R, {width: '70%', flex: 1}]}>
              {title}
            </Text>
           <Text>{created}</Text>
          </View>
        </View>
        <View>
            <Text>{description}</Text>
        </View>
        {/* <View style={styles.bottomBox}>
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
              $ {`${charges}`}
            </Text>
          </View>
        </View> */}
      </View>
    </Pressable>
  );
};

export default NotificationCard;

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
    height: scale(100),
    width: scale(100),
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
    // justifyContent: 'space-around',
    // marginVertical: 10,
  },
});
