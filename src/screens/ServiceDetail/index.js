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
import ShippingDetails from '../ShippingDetails';
const ServiceDetail = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { title, service } = route.params;
  const [userID, setUserID] = useState();
  const Availability = JSON.parse(service.availability);

  const [CheckBoxes, setCheckBoxes] = useState(new Array(Availability.length).fill(false));

  const toggleCheckBox = (value, index) => {
    let temp = CheckBoxes;
    temp[index] = value;
    setCheckBoxes([...temp]);
  };

  const concatenateImageUrls = () => {
    return service.images.map(value => service.url + value);
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
          <Text style={[globalStyles.font16R, { marginTop: 25, marginBottom: 10 }]}>About</Text>
          <Text style={[globalStyles.font16R]}>$ {service.price}</Text>
          <Text style={[globalStyles.font14, { color: colors.lightBlack }]}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          </Text>
          <Text style={[globalStyles.font16R, { marginTop: 25, marginBottom: 10 }]}>Availability</Text>
          {Availability.map((item, index) => (
            <View style={[globalStyles.justifyCenterRow, { justifyContent: 'flex-start' }]} key={index}>
              <CheckBox
                disabled={false}
                value={CheckBoxes[index]}
                onValueChange={newValue => toggleCheckBox(newValue, index)}
              />
              <Text style={globalStyles.font14}>{item.day} {item.time}</Text>
            </View>
          ))}
          <Button
            btnName={isLoading ? <ActivityIndicator color={colors.white} /> : 'Comfirm Booking'}
            onPress={createBooking}
            customStyle={{ marginVertical: 40 }}
          />
        </ScrollView>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confrim Booking</Text>
            <Text style={styles.modalText}>
              Are you sure you want to create the booking?
            </Text>

            <View style={{flexDirection:'row'}}>
            <TouchableOpacity
              style={[styles.modalButton, { marginRight: 10 }]}
              onPress={() => {
                setIsModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton]}
              onPress={async () => {
                setIsLoading(true);

                const booking_time = Availability.filter((item, index) => CheckBoxes[index]);
                if (booking_time.length > 0) {
                  const res = await bookService(service.id, booking_time, userID);
                  console.log(userID);

                  setIsModalVisible(false);
                  navigation.navigate('ShippingDetails', {
                    serviceId: service.id,
                    bookingTime: booking_time,
                  });
                  //setIsOrderSuccessModalVisible(true);
                } else {
                  ToastAndroid.showWithGravity(
                    'Please select a time before booking',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM
                  );
                }

                setIsLoading(false);
              }}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* OrderSuccess Modal */}
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={isOrderSuccessModalVisible}
        onRequestClose={() => {
          setIsOrderSuccessModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <OrderSuccess navigation={navigation} />
          </View>
        </View>
      </Modal> */}
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

export default ServiceDetail;
