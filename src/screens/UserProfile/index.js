import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Lock from '../../assets/images/svg/lock.svg';
import Email from '../../assets/images/svg/mail.svg';
import Button from '../../components/Button';
import Container from '../../components/Container';
import HomeHeader from '../../components/HomeHeader';
import InputBox from '../../components/InputBox';
import globalStyles from '../../styles/globalStyles';
import Edit from '../../assets/images/svg/edit.svg';
import {scale} from 'react-native-size-matters';
const UserProfile = () => {
  const [data, setData] = useState({
    userName: '',
    surName: '',
    email: '',
    phone: '',
    location: '',
  });

  const [isEyePressed, setEyePressed] = useState(false);
  const onEyePress = () => {
    setEyePressed(!isEyePressed);
  };
  return (
    <Container customStyle={{backgroundColor: '#ffffff'}}>
      <HomeHeader title={'My Profile'} screenName={'userAccount'} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 20, paddingBottom: 20}}>
          <View style={{alignItems: 'center', marginBottom: scale(80)}}>
            <Image
              source={require('../../assets/images/png/user.png')}
              style={{width: 110, height: 110}}
            />
            <TouchableOpacity
              style={{position: 'absolute', bottom: -10, right: scale(110)}}>
              <Edit />
            </TouchableOpacity>
          </View>
          <Text style={[globalStyles.font16R, {marginBottom: 20}]}>
            Basic Details
          </Text>
          <InputBox
            placeholder={'Email'}
            value={data.email}
            onChangeText={text => {
              setData({...data, email: text});
            }}
            Icon={Email}
          />
          <InputBox
            placeholder={'Password'}
            value={data.password}
            onChangeText={text => {
              setData({...data, password: text});
            }}
            secureTextEntry={isEyePressed ? false : true}
            Icon={Lock}
            isEye={true}
            onEyePress={onEyePress}
          />
        </View>
      </ScrollView>
      <Button
        btnName={'Update'}
        customStyle={{marginBottom: 10}}
        onPress={() => {}}
      />
    </Container>
  );
};

export default UserProfile;
