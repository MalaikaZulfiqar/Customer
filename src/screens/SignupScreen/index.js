import React, { useState, useEffect, useRef } from 'react';
import Container from '../../components/Container';
import { scale } from 'react-native-size-matters';
import { colors, fonts } from '../../constants';
import AuthHeader from '../../components/AuthHeader';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import Account from '../../assets/images/svg/account.svg';
import Phone from '../../assets/images/svg/phone.svg';
import Email from '../../assets/images/svg/mail.svg';
import Location from '../../assets/images/svg/location.svg';
import Lock from '../../assets/images/svg/lock.svg';
import Button from '../../components/Button';
import emailValidator from 'email-validator'
import { checkUsername, checkEmail, registerUser, send_opt } from '../../services/ApiService';
import PhoneInput from 'react-native-phone-number-input';
import InputBox from '../../components/InputBox';
import VerifyAccountScreen from '../VerficationScreen';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tick from '../../assets/images/svg/tick.svg';
import Cross from '../../assets/images/svg/cross.svg';
import signupStyle from './signupStyle';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const Signup = ({ navigation }) => {
  const isUsernameAvailableRef = useRef(false);
  const isValidPhoneNumber = useRef(false);
  const [isEyePressed, setEyePressed] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isUserEmailAvailableRef = useRef(false);
  const [otp, setOtp] = useState(0)
  const onEyePress = () => {
    setEyePressed(!isEyePressed);
  };
  const [data, setData] = useState({
    userName: '',
    surName: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    lat:'',
    lng:''
  });
  useEffect(() => {
    const isValid =
      data.userName.trim() !== '' &&
      data.surName.trim() !== '' &&
      data.email.trim() !== '' &&
      data.phone.trim() !== '' &&
      data.location.trim() !== '';
    setIsFormValid(isValid);
  }, [data]);

  const handleCheckUsername = async () => {
    try {
      const response = await checkUsername(data.userName);
      if (response.result == true) {
        isUsernameAvailableRef.current = true;
      }
    } catch (error) {
      console.error('Error checking username availability:', error);
    }
  };
  const handleCheckEmail = async () => {
    try {
      const response = await checkEmail(data.email);
     
      if (response.result == true) {
        isUserEmailAvailableRef.current = true
        console.log(response.result);
      }
    }
    catch (error) {
      console.log('Error checking email availability:', error);
    }
  }
  const handleSignup = async () => {
    if (!isFormValid) {
      Alert.alert('Invalid Input', 'Please fill all the required fields correctly.');
    } else {
      setIsLoading(true);
      try {
        const response = await send_opt(data.phone);
        console.log(data.phone)
        console.log(response.code)
        const code = response.code;
        const codestr = code.toString();
        await AsyncStorage.setItem('OTP', codestr);
        navigation.navigate('VerifyAccountScreen', { useData: data });
      } catch (error) {
        console.error('Error during registration:', error);
        Alert.alert('Registration Error', 'An error occurred during registration. Please try again.');
      }
      setIsLoading(false);
    }
  };
  const validatePhoneNumber = (text) => {
    console.log(text)
  }

  const validateEmail = (email) => {
    setIsValidEmail(emailValidator.validate(email));
  };
  return (
    <Container
      customStyle={{ backgroundColor: colors.blue, paddingHorizontal: 0 }}>
      <FocusAwareStatusBar
        animated={true}
        backgroundColor={colors.blue}
        barStyle={'light-content'}
      />
      <AuthHeader />
      <View style={globalStyles.box}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>
          <ScrollView keyboardShouldPersistTaps={'handled'}>
            <Text
              style={[globalStyles.font20B, { color: colors.blue, marginTop: 30 }]}>
              Lets get something
            </Text>
            <Text
              style={[
                globalStyles.font14,
                { color: colors.lightBlack, marginTop: 10 },
              ]}>
              Good to see you back.
            </Text>
            <View style={{ marginTop: 30 }}>
            <View style={signupStyle.inputBox}>
                <View style={signupStyle.iconBox}>
                  <Account />
                </View>
                <TextInput
                  placeholder={'Username'}
                  value={data.userName}
                  onChangeText={text => {
                    setData({ ...data, userName: text });
                    handleCheckUsername()
                  }}
                  style={[
                    signupStyle.textInput,
                    { borderColor: data.email ? colors.primaryColor : '#F3F3F3' }
                  ]}
                />
                
                { isUsernameAvailableRef.current===true ? (
                  <Tick style={signupStyle.leftIconBox} />
                ) : (
                  <Cross style={signupStyle.leftIconBox} />
                )}
              </View>
              
              <InputBox
                placeholder={'Full name'}
                value={data.surName}
                onChangeText={text => {
                  setData({ ...data, surName: text });
                }}
                Icon={Account}
              />
              <View style={{ borderRadius: 12, backgroundColor: '#F3F3F3', marginBottom: 20 }}>
                <PhoneInput value={data.phone}

                  defaultValue={data.phone}
                  textContainerStyle={{ backgroundColor: '#F3F3F3' }}
                  textInputStyle={{ padding: 12 }}
                  onChangeFormattedText={(text) => {
                    setData({ ...data, phone: text });
                    validatePhoneNumber(text);
                  }}

                />
              </View>

              <View style={signupStyle.inputBox}>
                <View style={signupStyle.iconBox}>
                  <Email />
                </View>
                <TextInput
                  placeholder={'Email'}
                  value={data.email}
                  onChangeText={text => {
                    setData({ ...data, email: text });
                    handleCheckEmail();
                    validateEmail(text)
                  }}
                  style={[
                    signupStyle.textInput,
                    { borderColor: data.email ? colors.primaryColor : '#F3F3F3' }
                  ]}
                />
                {/* {isValidEmail && <Tick style={signupStyle.leftIconBox} />} */}
                { (isUserEmailAvailableRef.current===true && isValidEmail) ? (
                  <Tick style={signupStyle.leftIconBox} />
                ) : (
                  <Cross style={signupStyle.leftIconBox} />
                )}
              </View>
              <InputBox
                placeholder={'Password'}
                value={data.password}
                onChangeText={text => {
                  setData({ ...data, password: text });
                }}
                secureTextEntry={isEyePressed ? false : true}
                Icon={Lock}
                isEye={true}
                onEyePress={onEyePress}
              />
              <View style={signupStyle.inputBox} >
                <View style={signupStyle.iconBox}>
                  <Location />
                </View>
                <GooglePlacesAutocomplete
                  placeholder='Search location'
                  returnKeyType={'default'}
                  fetchDetails={true}
                  //currentLocation = {true}
                  isRowScrollable={true}
                  keepResultsAfterBlur={false}
                  enablePoweredByContainer={false}
                  styles={{

                    textInputContainer: {
                      marginTop: 0,
                    },
                    textInput: {
                      height: scale(50),
                      borderRadius: 15,
                      marginBottom: 13,
                      paddingLeft: 55,
                      fontSize: 16,
                      color: colors.black,
                      fontFamily: fonts.regular,
                      backgroundColor: '#F3F3F3',
                      flex: 1,
                      paddingRight: 45,
                      borderWidth: 1,
                      borderColor: data.location ? colors.primaryColor : '#F3F3F3'
                    },
                    predefinedPlacesDescription: {
                      color: '#1faadb',
                    },
                    listView: {
                      position: 'relative',
                      zIndex: 3,
                      marginTop: 0,
                      padding: 0
                    },
                    row: {
                      backgroundColor: '#FFFFFF',
                      height: 100,
                      flexDirection: 'row',
                    },
                    separator: {
                      height: 0.5,
                      backgroundColor: '#c8c7cc',
                    },
                    description: {},
                    loader: {
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      height: 20,
                    },
                  }}
                  onPress={({description}, details) => {
                    if (details) {
                      const { geometry } = details;
                      const { location } = geometry;

                      const latitude = location.lat;
                      const longitude = location.lng;
                       
                       console.log('Latitude:', latitude);
                       console.log('Longitude:', longitude);
                       setData({...data,location:description,lng:longitude,lat:latitude})
                       //console.log(data.location)
                     
                    }
                  }}
                  query={{
                    key: 'AIzaSyBqwk2I_l08r0RFRQSmOSqDj1Y5TIYCNO8',
                    language: 'en',
                  }}
                />
              </View>
            </View>
            <Button
              btnName={isLoading ? <ActivityIndicator color={colors.white} /> : 'Create Account'}
              disabled={!isFormValid}
              onPress={handleSignup}
            />
            <View>
              <TouchableOpacity
                style={{ marginBottom: 10 }}
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                <Text style={[globalStyles.font14, { textAlign: 'center' }]}>
                  Already have an account?{' '}
                  <Text
                    style={{
                      color: colors.primaryColor,
                      fontFamily: fonts.bold,
                      textAlign: 'center',
                    }}>
                    {' '}
                    Login
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    </Container>
  );
};

export default Signup;
