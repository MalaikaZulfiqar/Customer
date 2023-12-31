import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        GetFCMToken();
    }
}
async function GetFCMToken() {
    let fcmtoken = await AsyncStorage.getItem('fcmtoken');
    console.log("old token:", fcmtoken);
    if (!fcmtoken) {

        try {
            const fcmtoken =await messaging().getToken();
            if (fcmtoken) {
               
                await AsyncStorage.setItem("fcmtoken", fcmtoken);
                console.log("new token:", fcmtoken);
            }
        }
        catch (error) {
            console.log(error, "error in fcm token")
        }
  
        
    }
} 
const NotificationListner=()=>{
      // Assume a message-notification contains a "type" property in the data payload of the screen to open

      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });

       // Check whether an initial notification is available
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      
    });

    messaging().onMessage(async remoteMessage => {
        console.log("notification on foreground state.....",remoteMessage)
    })
}

export {requestUserPermission,NotificationListner}