import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import GetStarted from '../screens/GetStarted';
import Login from '../screens/LoginScreen';
import Signup from '../screens/SignupScreen';
import Onboarding from '../screens/Onboarding';
import VerifyAccountScreen from '../screens/VerficationScreen';
import ForgotPass from '../screens/ForgotPassword.js';
import VerifyPass from '../screens/VerifyPassword';
import ChangePassword from '../screens/ChangePassword';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}
      initialRouteName="Onboarding">
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name='VerifyAccountScreen' component={VerifyAccountScreen}/>
      <Stack.Screen name='ForgotPass' component={ForgotPass}/>
      <Stack.Screen name='VerifyPass' component={VerifyPass}/> 
      <Stack.Screen name='ChangePassword' component={ChangePassword}/>
    </Stack.Navigator>
  );
};

export default AuthStack;
