import React, { useState, useRef, useEffect } from 'react';
import Container from '../../components/Container';
import { colors, fonts } from '../../constants';
import AuthHeader from '../../components/AuthHeader';
import InputBox from '../../components/InputBox';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator,ToastAndroid } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import Account from '../../assets/images/svg/account.svg';
import Lock from '../../assets/images/svg/lock.svg';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkEmail, checkUsername, login,send_opt } from '../../services/ApiService';
import VerifyPass from '../VerifyPassword';
import PhoneInput from 'react-native-phone-number-input';
const ForgotPass = ({ navigation }) => {
  const [data, setData] = useState({
    phone: '',
    
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEyePressed, setEyePressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    try {
      setIsLoading(true); // Show the loading indicator on the button
      const response = await send_opt(data.phone);

      if (response.result === true) {
           if (response.user_exist===true){
            console.log(response.code)
            await AsyncStorage.setItem('user_id', response.user_id);
            const code=response.code;
           const codestr=code.toString();
            await AsyncStorage.setItem('new_otp',codestr)
            navigation.navigate('VerifyPass');

           }

           else {
            ToastAndroid.showWithGravity('Please enter correct number to change your password')
           }
        
        // const userID=await AsyncStorage.getItem('userID');
        // console.log(userID);
       // navigation.navigate('AppStack');
      } else {
        //ToastAndroid.showWithGravity(response.message,ToastAndroid.LONG,ToastAndroid.BOTTOM)
        console.log('Login failed:', response.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setIsLoading(false); // Hide the loading indicator on the button
    }
  };

  return (
    <Container customStyle={{ backgroundColor: colors.blue, paddingHorizontal: 0 }}>
      <FocusAwareStatusBar
        animated={true}
        backgroundColor={colors.blue}
        barStyle={'light-content'}
      />
      <AuthHeader />
      <View style={globalStyles.box}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[globalStyles.font20B, { color: colors.blue, marginTop: 30 }]}>
            Forgot Password
          </Text>
          <Text style={[globalStyles.font14, { color: colors.lightBlack, marginTop: 10 }]}>
            Let's change your password
          </Text>
          <View style={{ marginTop: 30 }}>

          <View style={{borderRadius:12,backgroundColor:'#F3F3F3',marginBottom:20}}>
            <PhoneInput value={data.phone}
                  
                  defaultValue={data.phone}
                  // onChangeText={text => {
                  //   setData({ ...data, phone: text });
                  //   validatePhoneNumber(text);
                  // }}
                  textContainerStyle={{backgroundColor:'#F3F3F3'}}
                  textInputStyle={{padding:12}}
                  onChangeFormattedText={(text)=>{
                    setData({ ...data, phone:text });
                    //validatePhoneNumber(text);
                  }}
                  
            />
            </View>

          </View>

          <Button
            btnName={isLoading ? <ActivityIndicator color={colors.btnColor} /> : 'Continue'}
            onPress={handleLogin}
          />

        </ScrollView>
      </View>
    </Container>
  );
};

export default ForgotPass;
