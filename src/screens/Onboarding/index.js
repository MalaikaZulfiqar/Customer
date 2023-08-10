import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Swiper from 'react-native-swiper';
import Onboarding1 from '../../assets/images/svg/onboarding1.svg';
import Onboarding2 from '../../assets/images/svg/onboarding2.svg';
import Onboarding3 from '../../assets/images/svg/onboarding3.svg';
import {colors, fonts} from '../../constants';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import globalStyles from '../../styles/globalStyles';
const {width, height} = Dimensions.get('window');

const Onboarding = () => {
  const dots = [];
  const navigation = useNavigation();
  const [imageIndex, setImageIndex] = useState(0);

  const swiperRef = useRef(null);
  const handleButtonPress = () => {
    if (imageIndex === 2) {
      navigation.navigate('GetStarted');
    } else {
      swiperRef.current.scrollBy(1);
    }
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
      />
      <View style={{flex: 1}}>
        <Swiper
          style={styles.wrapper}
          loop={false}
          index={imageIndex}
          ref={swiperRef}
          onIndexChanged={index => setImageIndex(index)}
          renderPagination={(index, total, context) => {
            for (let i = 0; i < total; i++) {
              dots.push(
                <View
                  key={i}
                  style={[styles.circle, {borderWidth: i === index ? 1 : 0}]}>
                  <View
                    style={[
                      styles.dot,
                      i === index ? styles.activeDot : styles.inactiveDot,
                    ]}
                  />
                </View>,
              );
            }
          }}>
          <View style={styles.box}>
            <Onboarding1 />
            <Text style={styles.title}>
              Lorem ipsum dolor sit amet, consetetur
            </Text>
            <Text style={styles.subTitleStyles}>
              Lorem ipsum dolor sit amet,
            </Text>
          </View>
          <View style={styles.box}>
            <Onboarding2 />
            <Text style={styles.title}>Lorem ipsum dolor sit</Text>
            <Text style={styles.subTitleStyles}>
              Lorem ipsum dolor sit amet,
            </Text>
          </View>
          <View style={styles.box}>
            <Onboarding3 />
            <Text style={styles.title}>Lorem ipsum</Text>
            <Text style={styles.subTitleStyles}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
            </Text>
          </View>
        </Swiper>
      </View>
      <View style={styles.pagination}>{dots}</View>
      <View
        style={[
          globalStyles.justifyBtwRow,
          {marginTop: 50, paddingHorizontal: 15},
        ]}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('GetStarted');
          }}>
          <Text style={[globalStyles.font16R, {color: colors.primaryColor}]}>
            Skip
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: colors.primaryColor}]}
          onPress={handleButtonPress}>
          <Text style={[globalStyles.font16R, {color: colors.white}]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Onboarding;
const styles = StyleSheet.create({
  wrapper: {},
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    color: colors.primaryColor,
    fontSize: scale(20),
    fontFamily: fonts.medium,
    textAlign: 'center',
    marginTop: scale(40),
  },
  subTitleStyles: {
    textAlign: 'center',
    color: colors.black,
    fontSize: scale(14),
    fontFamily: fonts.regular,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
  },
  activeDot: {
    backgroundColor: colors.primaryColor,
    width: 12,
    height: 12,
    borderRadius: 10,
  },
  inactiveDot: {
    backgroundColor: '#E2E2E2',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 70,
    alignSelf: 'center',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  btn: {
    width: '45%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
