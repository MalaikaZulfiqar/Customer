import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Logo from '../assets/images/png/LOGO.png';
import globalStyles from '../styles/globalStyles';
import {colors} from '../constants';
import Bell from '../assets/images/svg/bell.svg';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
import {deviceWidth} from '../constants/Dimentions';
import BellIcon from '../components/BellIcon';
import Notification from '../screens/Notification';
const HomeHeader = ({screenName, title, isBackTitle}) => {
const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.smBox}>
        {screenName === 'home' ? (
          <View style={styles.box}>
            <Image source={Logo} style={styles.logo} />
            <Text style={[globalStyles.font18M, {marginLeft: 10}]}>
              Task<Text style={{color: colors.primaryColor}}>Kit</Text>
            </Text>
          </View>
        ) : (
          !isBackTitle && (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name="arrow-left" color={'#000000'} size={20} />
            </TouchableOpacity>
          )
        )}
      </View>
      {title && (
        <View style={[styles.smBox, {flex: 1}]}>
          <Text style={[globalStyles.font16R, {textAlign: 'center'}]}>
            {title}
          </Text>
        </View>
      )}
      {screenName !== 'userAccount' && (
        <View style={styles.smBox}>
          <View>
            <BellIcon navigation={navigation}/>
          </View>
        </View>
      )}
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    justifyContent: 'space-between',
    paddingBottom: 10,
    backgroundColor: colors.white,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'center',
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smBox: {},
});
