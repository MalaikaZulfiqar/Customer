import React from 'react';
import {ScrollView, View} from 'react-native';
import cleaning from '../../assets/images/png/cardImg.png';
import repairing from '../../assets/images/png/cardImg1.png';
import Container from '../../components/Container';
import HomeHeader from '../../components/HomeHeader';

import Card from '../../components/Card';
import {colors} from '../../constants';

const Saved = ({navigation}) => {
  return (
    <Container customStyle={{backgroundColor: '#F6F6F6', paddingHorizontal: 0}}>
      <View style={{paddingHorizontal: 15, backgroundColor: colors.white}}>
        <HomeHeader screenName={'Booking'} title={'BookMarks'} />
      </View>
      <View style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: 25, paddingHorizontal: 15}}>
            <Card
              title={'Cleaning'}
              workerName={'Rose Conwell'}
              off={'17%'}
              img={cleaning}
              rating={'4.1'}
              charges={8}
            />
            <Card
              title={'Repairing'}
              workerName={'Mike Smith'}
              off={'37%'}
              img={repairing}
              rating={'3.3'}
              charges={10}
            />
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};

export default Saved;
