import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//import { Ionicons } from '@expo/vector-icons'; // You can use your desired icon library
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../constants';
import NotificationCard from '../../components/NotificationCard';
import NotificationDetails from '../NotificationDetails';
import { get_Notifications ,noti_seen} from '../../services/ApiService';
const Notification = ({ navigation }) => {
    const [notification, setNotification] = useState([])
    const handleNotification = async () => {
        const userID = await AsyncStorage.getItem('userID');
        try {
            const response = await get_Notifications(userID, 'user');
            if (response && response.data) {
                const services = response.data;
                setNotification(services);
                console.log("this is serviveeeee",services)

            }
        } catch (error) {
            console.error(error);
        }

    }
    const seen_notification=async()=>{
        const userID = await AsyncStorage.getItem('userID');
        try {
            const response = await noti_seen(userID);
            if (response.result===true ) {
                console.log("Notification Seen");

            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        handleNotification();
        get_Notifications();
      }, []);
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" color={colors.black} size={18} />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Notification</Text>
            </View>

            <View style={styles.content}>
            {notification.map((item, index) =>
              <NotificationCard
                title={item.title}
                created={item.created_at} //pass property of item to affect Heart Icon
                img={item.services.thumb}
                description={item.description}
                onPress={() => {
                  navigation.navigate('NotificationDetails', {title: item.title, service:item});
                }}
              />
              )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20, // Adjust the top padding as needed
    },
    backButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 10,
        zIndex: 1,
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
       
        marginBottom:10
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Notification;
