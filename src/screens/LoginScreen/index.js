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
import { checkEmail, checkUsername, login } from '../../services/ApiService';
import ForgotPass from '../ForgotPassword.js';
const Login = ({ navigation }) => {
  const [data, setData] = useState({
    userName: '',
    password: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEyePressed, setEyePressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onEyePress = () => {
    setEyePressed(!isEyePressed);
  };

  const isUsernameAvailableRef = useRef(true);
  const isEmailAvailableRef = useRef(false);

  const handleCheckUsername = async () => {
    try {
      const response = await checkUsername(data.userName);
      console.log(response.result);
      if (response.result === false) {
        isUsernameAvailableRef.current = false;
        console.log(isUsernameAvailableRef.current);
      }
    } catch (error) {
      console.error('Error checking username availability:', error);
      // Handle API error
    }
  };

  const handleCheckEmail = async () => {
    try {
      const response = await checkEmail(data.userName);
      console.log(response.result);
    } catch (error) {
      console.log('Error checking email availability:', error);
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true); // Show the loading indicator on the button
      const response = await login(data.userName, data.password);

      if (response.result === true) {
        console.log(response.message);
        await AsyncStorage.setItem('userID', response.user_id);
        // const userID=await AsyncStorage.getItem('userID');
        // console.log(userID);
        navigation.navigate('AppStack');
      } else {
        ToastAndroid.showWithGravity(response.message,ToastAndroid.LONG,ToastAndroid.BOTTOM)
        console.log('Login failed:', response.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setIsLoading(false); // Hide the loading indicator on the button
    }
  };

  useEffect(() => {
    // Check form validity whenever username/email or password changes
    checkFormValidity();
  }, [data]);

  const checkFormValidity = () => {
    // Check if both username/email and password are not empty
    const isValid = data.userName.trim() !== '' && data.password.trim() !== '';
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
            Lets get something
          </Text>
          <Text style={[globalStyles.font14, { color: colors.lightBlack, marginTop: 10 }]}>
            Good to see you back.
          </Text>
          <View style={{ marginTop: 30 }}>
            <InputBox placeholder={'Email/Username'}
              value={data.userName}
              onChangeText={text => {
                setData({ ...data, userName: text });
                //handleCheckEmail();
              }}
              Icon={Account}
              check={isUsernameAvailableRef.current}
            />
            <InputBox placeholder={'Password'}
              value={data.password}
              onChangeText={text => {
                setData({ ...data, password: text });
              }}
              secureTextEntry={isEyePressed ? false : true}
              Icon={Lock}
              isEye={true}
              onEyePress={onEyePress}
            />
          </View>
          <TouchableOpacity style={{ marginTop: -15, marginBottom: 40 }}
          onPress={()=>{navigation.navigate('ForgotPass')}} >
            <Text style={[globalStyles.font14, { color: colors.primaryColor, textAlign: 'right' }]}>
              Forget Password?
            </Text>
          </TouchableOpacity>
          <Button
            btnName={isLoading ? <ActivityIndicator color={colors.btnColor} /> : 'Login'}
            onPress={handleLogin}
            disabled={!isFormValid || isLoading}
          />
          <View>
            <TouchableOpacity>
              <Text style={[globalStyles.font12, { marginTop: 30, textAlign: 'center', marginBottom: 10 }]}>
                Need support?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: -2 }}
              onPress={() => {
                navigation.navigate('Signup');
              }}
            >
              <Text style={[globalStyles.font14, { textAlign: 'center' }]}>
                Don't have an account?
                <Text
                  style={{
                    color: colors.primaryColor,
                    fontFamily: fonts.bold,
                    textAlign: 'center',
                  }}
                >
                  {' '}
                  Sign up
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};

export default Login;
