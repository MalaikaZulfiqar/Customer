import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';
import Img from '../assets/images/png/img.png';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import {colors, fonts} from '../constants';
const ServiceSlider = ({text, images}) => {
  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
        animated={true}
      />
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        showsPagination={true}
        removeClippedSubviews={false}
        containerStyle={{marginBottom: 0}}
        activeDotColor={colors.white}
        dotColor={'#D9D9D9'}
        activeDotStyle={{width: 25, height: 6}}
        dotStyle={{width: 15, height: 6}}
        paginationStyle={{marginBottom: -10}}>
          {images.map((item,index)=>
            <View style={styles.slide} key={index}>
              <Text style={styles.txt}>
                
                {text}
              </Text>
              <Image style={styles.img} source={{uri: item}} />
            </View>
          )}
      </Swiper>
    </SafeAreaView>
  );
};

export default ServiceSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  wrapper: {
    // height: 230,
  },
  slide: {
    flex: 1,
    // alignItems: 'center',
    borderRadius: 15,
    // marginHorizontal: 2,
    justifyContent: 'center',
  },
  img: {
    width: '100%',
    height: 250,
    resizeMode: 'stretch',
    zIndex: -1,
  },
  txt: {
    position: 'absolute',
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.white,
    left: 20,
  },
});
