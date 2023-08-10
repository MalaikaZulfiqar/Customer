import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {colors, fonts} from '../constants/index';
import Home from '../screens/HomeScreen';
import UserAccount from '../screens/UserProfile/Setting';
import Bookings from '../screens/Bookings';
import Saved from '../screens/Saved';
import HomeSvg from '../components/HomeSvg';
import BookingSvg from '../components/BookingSvg';
import SavedSvg from '../components/SavedSvg';
import Icon from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

const BottomBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: colors.primaryColor,
        tabBarInactiveTintColor: '#6C757D',
        tabBarStyle: {
          height: 65,
          paddingBottom: 5,
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: fonts.medium,
          top: -4,
        },
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => <HomeSvg focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={Bookings}
        options={{
          tabBarIcon: ({focused}) => <BookingSvg focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Saved"
        component={Saved}
        options={{
          tabBarIcon: ({focused}) => <SavedSvg focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserAccount}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="user"
              color={focused ? '#FB5353' : '#B7B7B7'}
              size={25}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomBar;
