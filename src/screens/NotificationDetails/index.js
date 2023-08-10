import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ToastAndroid, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import Container from '../../components/Container';
import ServiceSlider from '../../components/ServiceSlider';
import globalStyles from '../../styles/globalStyles';
import { colors } from '../../constants';
import CheckBox from '@react-native-community/checkbox';
import Button from '../../components/Button';
import { bookService } from '../../services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrderSuccess from '../OrderSuccess';

const NotificationDetails = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { title, service } = route.params;
  const [userID, setUserID] = useState();
 const Availability = JSON.parse(service.services.availability);

//   const [CheckBoxes, setCheckBoxes] = useState(new Array(Availability.length).fill(false));

  const toggleCheckBox = (value, index) => {
    let temp = CheckBoxes;
    temp[index] = value;
    setCheckBoxes([...temp]);
  };

  const concatenateImageUrls = () => {
    return service.services.images.map(value => service.url + value);
  };

  const getId = async () => {
    const result = await AsyncStorage.getItem('userID');
    setUserID(result);
  };

  useEffect(() => {
    getId();
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOrderSuccessModalVisible, setIsOrderSuccessModalVisible] = useState(false);

  const createBooking = async () => {
    setIsModalVisible(true);
  };

  return (
    <Container customStyle={{ paddingHorizontal: 0, backgroundColor: '#F6F6F6' }}>
      <View style={{ height: 250 }}>
        <ServiceSlider text={title} images={concatenateImageUrls()} />
      </View>
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[globalStyles.font16R, { marginTop: 25, marginBottom: 10 }]}>Description</Text>
          <Text style={[globalStyles.font14, { color: colors.lightBlack ,marginTop:10}]}>
            {service.description}
          </Text>
          <Text style={[globalStyles.font16R, { marginTop: 25, marginBottom: 10 }]}>Availability</Text>
          {Availability.map((item, index) => (
          <View key={index} style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text>{item.day}</Text>
            
            <Text>{item.time}</Text>
            
          </View>
        ))}
          {/* {Availability.map((item, index) => (
            <View style={[globalStyles.justifyCenterRow, { justifyContent: 'flex-start' }]} key={index}>
              <CheckBox
                disabled={false}
                value={CheckBoxes[index]}
                onValueChange={newValue => toggleCheckBox(newValue, index)}
              />
              <Text style={globalStyles.font14}>{item.day} {item.time}</Text>
            </View>
          ))} */}
          <View style={{flexDirection:'row'}}>
            <Text style={[globalStyles.font16R, { marginTop: 25, marginBottom: 10 }]}>Status :</Text>
            <Text style={{marginTop:26,marginLeft:12}}>{service.booking.status}</Text>
          </View>
        </ScrollView>
      </View>

      {/* Custom Modal for "Create Booking" confirmation */}
      

      
    </Container>
  );
};

const styles = StyleSheet.create({

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor:colors.btnColor,
    borderWidth:1,
    minWidth:100

  },
  modalButtonText: {
    color: colors.btnColor,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center',
  },
});

export default NotificationDetails;
