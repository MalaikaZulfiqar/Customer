import {Image, TouchableOpacity, Text, View, ScrollView} from 'react-native';
import React from 'react';
import Container from '../../components/Container';
import HomeHeader from '../../components/HomeHeader';
import styles from './styles';
import Rating from '../../assets/images/svg/rating.svg';
import BookMark from '../../assets/images/svg/bookmark.svg';
import sample1 from '../../assets/images/png/sample1.png';
import sample2 from '../../assets/images/png/sample2.png';
import sample3 from '../../assets/images/png/sample3.png';
import Shop from '../../assets/images/svg/shop.svg';

import globalStyles from '../../styles/globalStyles';
import {scale} from 'react-native-size-matters';
import {colors} from '../../constants';
const WorkerDetail = ({route, navigation}) => {
  const {name, img, rating} = route.params;
  return (
    <Container>
      <HomeHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 20}}>
          <View style={styles.topBox}>
            <View>
              <Image source={img} style={styles.img} />
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 10,
                height: 120,
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={globalStyles.font12}>Home Cleaning</Text>
                <Text style={[globalStyles.font24B, {marginTop: -3}]}>
                  {name}
                </Text>
                <Text style={[globalStyles.font12, {marginTop: -7}]}>
                  Deposit, New York(NY), 13754
                </Text>
              </View>
              <View style={globalStyles.justifyBtwRow}>
                <View style={styles.ratingBox}>
                  <Rating />
                  <Text>{rating}</Text>
                </View>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <BookMark />
                  <Text style={[globalStyles.font12, {marginLeft: 7}]}>
                    Add to bookmark
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text
            style={[globalStyles.font14, {marginTop: 30, marginBottom: 40}]}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et
          </Text>
          <Text style={[globalStyles.font16M, {marginBottom: 20}]}>
            Photos and Videos
          </Text>
          <View style={[globalStyles.justifyBtwRow, {marginBottom: 10}]}>
            <View style={{flex: 1}}>
              <Image
                source={sample1}
                style={{
                  width: scale(165),
                  height: scale(280),
                  resizeMode: 'stretch',
                }}
              />
            </View>
            <View style={{justifyContent: 'space-between', height: scale(280)}}>
              <Image
                source={sample2}
                style={{
                  width: scale(135),
                  height: scale(130),
                  resizeMode: 'stretch',
                }}
              />
              <Image
                source={sample3}
                style={{
                  width: scale(135),
                  height: scale(130),
                  resizeMode: 'stretch',
                }}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('OrderSuccess');
          }}>
          <Shop />
          <Text
            style={[
              globalStyles.font16M,
              {color: colors.white, marginLeft: 10},
            ]}>
            Book Now
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

export default WorkerDetail;
