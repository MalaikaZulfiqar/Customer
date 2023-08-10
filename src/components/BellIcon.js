import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image ,Pressable} from 'react-native';
import { get_unseen_noti } from '../services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notification from '../screens/Notification';
import Signup from '../screens/SignupScreen';
const BellIcon = ({navigation}) => {
  const [showDot, setShowDot] = useState(false);

  const checkNotification = async () => {
    const userID = await AsyncStorage.getItem('userID');
    try {
      const response = await get_unseen_noti(userID);
      if (response.result === true) {
        setShowDot(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkNotification();
  }, []);

  return (
    <Pressable onPress={() => {
      console.log("Navigating to Notification");
      navigation.navigate('Notification');
    }}>

   
    <View style={styles.container}>
      <Image
        source={require('../assets/images/png/bell.png')}
        style={{ height: 15, width: 15 }}
      />
      {showDot && <View style={styles.dot} />}
    </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'flex-end',
  },
  dot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: 'red',
  },
});

export default BellIcon;
