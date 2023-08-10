import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Container from '../../components/Container';
import HomeHeader from '../../components/HomeHeader';
import Button from '../../components/Button';
import Success from '../../assets/images/svg/success.svg';
import globalStyles from '../../styles/globalStyles';
import Home from '../HomeScreen';
const OrderSuccess = ({navigation}) => {
  return (
    <Container>
      <HomeHeader
        screenName={'orderSuccess'}
        title={'Place Successfully'}
        isBackTitle={true}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.circle}>
          <Success />
        </View>
        <View>
          <Text style={[globalStyles.font24M, {textAlign: 'center'}]}>
            Order Placed
          </Text>
          <Text style={[globalStyles.font14, {textAlign: 'center'}]}>
            Your Booking has been made and added to your Schedule
          </Text>
        </View>
      </ScrollView>
      <Button
        btnName={'HomePage'}
        customStyle={{marginBottom: 10}}
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </Container>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  circle: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    backgroundColor: '#FEEBEB',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
});
