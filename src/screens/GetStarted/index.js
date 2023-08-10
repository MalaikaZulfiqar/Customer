import React from 'react';
import {Text, View, Image} from 'react-native';
import Container from '../../components/Container';
import Logo from '../../assets/images/png/LOGO.png';
import getStartedStyle from './getStartedstyle';
import styles from '../../styles/globalStyles';
import Button from '../../components/Button';
import globalStyles from '../../styles/globalStyles';
import {colors} from '../../constants';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

const GetStarted = ({navigation}) => {
  return (
    <Container>
      <FocusAwareStatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle={'dark-content'}
      />
      <View style={getStartedStyle.box}>
        <Image
          source={Logo}
          resizeMode="center"
          style={{width: 110, height: 110}}
        />
      </View>
      <View style={{marginBottom: 10}}>
        <View>
          <Text
            style={[
              globalStyles.font24M,
              {color: colors.primaryColor, textAlign: 'center'},
            ]}>
            Welcome
          </Text>
          <Text
            style={[
              globalStyles.font16R,
              {textAlign: 'center', marginBottom: 30},
            ]}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed{' '}
          </Text>
        </View>
        <Button
          btnName={'Login'}
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
        <Button
          btnName={'Sign up'}
          customStyle={{marginTop: 15}}
          onPress={() => {
            navigation.navigate('Signup');
          }}
        />
      </View>
    </Container>
  );
};

export default GetStarted;
