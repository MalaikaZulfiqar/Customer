import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerUser } from '../../services/ApiService';
import AppStack from '../../navigation/AppStack';
import { colors, fonts } from '../../constants';
import AuthHeader from '../../components/AuthHeader';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import globalStyles from '../../styles/globalStyles';
import Login from '../LoginScreen';
import Container from '../../components/Container';
const VerifyAccountScreen = ({ navigation, route }) => {
  const { useData } = route.params;
  const { username, name, email, password, phone, location } = useData;
  const textInputRefs = useRef([]); // To store refs of all TextInputs
  const [verificationCodes, setVerificationCodes] = useState(['', '', '', '']);
  const [activeInput, setActiveInput] = useState(0);

  const focusNextInput = (index) => {
    if (index < textInputRefs.current.length - 1) {
      textInputRefs.current[index + 1].focus();
    }
  };

  const focusPreviousInput = (index) => {
    if (index > 0) {
      textInputRefs.current[index - 1].focus();
    }
  };

  const handleKeyPress = (text, index) => {
    // Assuming only single-digit numbers are allowed
    if (text.length === 1) {
      focusNextInput(index);
    } else if (text.length === 0) {
      focusPreviousInput(index);
    }
    const newVerificationCodes = [...verificationCodes];
    newVerificationCodes[index] = text;
    setVerificationCodes(newVerificationCodes);
  };

  const handleFocus = (index) => {
    setActiveInput(index);
  };

  const handleBlur = () => {
    setActiveInput(-1); // Set activeInput to -1 when no input is focused
  };

  const handleVerify = async () => {
    const enteredVerificationCode = verificationCodes.join('');
    const storedVerificationCode = await AsyncStorage.getItem('OTP');

    if (enteredVerificationCode === storedVerificationCode) {
      // Verification successful, proceed with the account activation or any other action
      console.log('Account verified successfully!');
      const response = await registerUser(username, name, email, password, phone, location);
      if (response.result === true) {
        console.log(response.result)
        navigation.navigate('Login')
      }

      // You can navigate to the next screen or perform any other action here
    } else {
      // Verification failed, show an error message or take appropriate action
      console.log('Verification failed. Please try again.');
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
      <Text style={[globalStyles.font20B, { color: colors.blue, marginTop: 30 }]}>
            Account Verification
          </Text>
          <Text style={[globalStyles.font14, { color: colors.lightBlack, marginTop: 10 }]}>
            Let's verify your account
          </Text>
        <View style={styles.container}>
        <Text style={[globalStyles.font14, { color: colors.lightBlack, marginTop: 10,marginBottom:10 }]}>Please enter 4 digit code </Text>
          <View style={styles.inputContainer}>
            
            {verificationCodes.map((code, index) => (
              <TextInput
                key={index}
                style={[
                  styles.input,
                  {
                    backgroundColor: code.length === 1 ? colors.btnColor : 'white',
                    color: code.length === 1 ? 'white' : 'white',
                    borderColor: activeInput === index ? colors.btnColor : 'rgba(255, 0, 0, 0.3)',
                  },
                ]}
                keyboardType="numeric"
                maxLength={1}
                ref={(ref) => (textInputRefs.current[index] = ref)}
                onChangeText={(text) => handleKeyPress(text, index)}
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleVerify}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  input: {
    height: 50,
    width: 50,
    textAlign: 'center',
    fontSize: 20,
    borderWidth: 2,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: colors.btnColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VerifyAccountScreen;
