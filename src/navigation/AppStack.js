import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import BottomBar from './BottomNavigation';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import ServiceDetail from '../screens/ServiceDetail';
import WorkerDetail from '../screens/WorkerDetail';
import OrderSuccess from '../screens/OrderSuccess';
import UserProfile from '../screens/UserProfile';
import AllServices from '../screens/AllServices';
import Notification from '../screens/Notification';
import BellIcon from '../components/BellIcon';
import NotificationDetails from '../screens/NotificationDetails';
import ShippingDetails from '../screens/ShippingDetails';
import RatingReview  from '../components/RatingReview ';
import UpdatePassword from '../screens/UpdatePassword';
import Contact from '../screens/Contact';
const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <>
      <FocusAwareStatusBar
        animated={true}
        backgroundColor={'#ffffff'}
        barStyle={'dark-content'}
      />
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        <Stack.Screen name="HomeStack" component={BottomBar} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
        <Stack.Screen name="WorkerDetail" component={WorkerDetail} />
        <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="AllServices" component={AllServices} />
        <Stack.Screen name="Notification" component={Notification}/>
        <Stack.Screen  name="BellIcon" component={BellIcon}/>
        <Stack.Screen  name="NotificationDetails" component={NotificationDetails}/>
        <Stack.Screen name="ShippingDetails" component={ShippingDetails}/>
        <Stack.Screen name="RatingReview" component={RatingReview}/>
        <Stack.Screen name="UpdatePassword" component={UpdatePassword}/>
        <Stack.Screen name="Contact" component={Contact}/>
      </Stack.Navigator>
    </>
  );
};

export default AppStack;
