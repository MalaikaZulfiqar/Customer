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
import { checkEmail, checkUsername, login,update_password} from '../../services/ApiService';
import ForgotPass from '../ForgotPassword.js';
import Login from '../LoginScreen';
const ChangePassword = ({ navigation }) => {
  const [data, setData] = useState({
    newPass: '',
    confirmPass: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEyePressed, setEyePressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onEyePress = () => {
    setEyePressed(!isEyePressed);
  };

  // const handleUpdatePass = async () => {
  //   try {
  //     setIsLoading(true); // Show the loading indicator on the button
  //     const uid=await AsyncStorage.getItem('user_id')
  //     const response = await update_password(data.newPass, uid);

  //     if (response.result === true) {
  //       console.log(response.message);

  //     } else {
  //       ToastAndroid.showWithGravity(response.message,ToastAndroid.LONG,ToastAndroid.BOTTOM)
  //       console.log('Login failed:', response.message);
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error);
  //   } finally {
  //     setIsLoading(false); // Hide the loading indicator on the button
  //   }
  // };
  const handleUpdatePass = async () => {
    try {
      setIsLoading(true); // Show the loading indicator on the button

      if (data.newPass === data.confirmPass) {
        const uid = await AsyncStorage.getItem('user_id');
        await AsyncStorage.setItem('userID', uid);
        const response = await update_password(data.newPass, uid);

        if (response.result === true) {
            navigation.navigate('Login')
          console.log(response.result);
        } else {
          ToastAndroid.showWithGravity('Update password failed', ToastAndroid.LONG, ToastAndroid.BOTTOM);
          console.log('Update password failed:', response.message);
        }
      } else {
        ToastAndroid.showWithGravity('Passwords do not match', ToastAndroid.LONG, ToastAndroid.BOTTOM);
      }
    } catch (error) {
      console.error('Error during update password:', error);
    } finally {
      setIsLoading(false); // Hide the loading indicator on the button
    }
  };
  useEffect(() => {
    checkFormValidity();
  }, [data]);

  const checkFormValidity = () => {
    const isValid = data.newPass.trim() !== '' && data.confirmPass.trim() !== '';
    setIsFormValid(isValid);
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
            Change Password
          </Text>
          <Text style={[globalStyles.font14, { color: colors.lightBlack, marginTop: 10 }]}>
            Enter your password
          </Text>
          <View style={{ marginTop: 30 }}>
  
            <InputBox placeholder={'New Password'}
              value={data.newPass}
              onChangeText={text => {
                setData({ ...data, newPass: text });
              }}
              secureTextEntry={isEyePressed ? false : true}
              Icon={Lock}
              isEye={true}
              onEyePress={onEyePress}
            />
            <InputBox placeholder={'Confirm Password'}
              value={data.confirmPass}
              onChangeText={text => {
                setData({ ...data, confirmPass: text });
              }}
              secureTextEntry={isEyePressed ? false : true}
              Icon={Lock}
              isEye={true}
              onEyePress={onEyePress}
            />
          </View>

          <Button
            btnName={isLoading ? <ActivityIndicator color={colors.btnColor} /> : 'Submit'}
            onPress={handleUpdatePass}
            disabled={!isFormValid || isLoading}
          />
        </ScrollView>
      </View>
    </Container>
  );
};

export default ChangePassword;
