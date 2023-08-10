import React,{useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ToastAndroid,
  Modal
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Rating from '../assets//images/svg/rating.svg';
import {colors, fonts} from '../constants';
import globalStyles from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/AntDesign';
import { update_status, } from '../services/ApiService';
// import img from '../assets/images/png/cardImg.png';
import RatingReview  from './RatingReview ';
const BookingCard = ({
  img,
  title,
  workerName,
  rating,
  charges,
  onPress,
  type,
  day,
  time,
  id,
  fetchBookings
}) => {
  const navigation=useNavigation()
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const toggleCancelModal = () => {
    setIsCancelModalVisible(!isCancelModalVisible);
  };
  const handleCancelBooking = async () => {
    setIsCancelModalVisible(false);
    const res = await update_status(id, 'cancelled');
    if (res?.result) {
      ToastAndroid.showWithGravity('Booking Cancelled', ToastAndroid.LONG, ToastAndroid.BOTTOM);
      fetchBookings();
    } else {
      ToastAndroid.showWithGravity('Booking Could Not Be Cancelled', ToastAndroid.LONG, ToastAndroid.BOTTOM);
    }
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.box}>
        <Image style={styles.img} source={{uri:img}} />
        <View
          style={{
            flex: 1,
            marginLeft: 10,
            justifyContent: 'space-between',
            height: scale(100),
          }}>
          <View>
            <View style={globalStyles.justifyBtwRow}>
              <Text style={globalStyles.font16R}>{title}</Text>
              <TouchableOpacity>
                <Icon name="close" color={'#E2E2E2'} size={20} />
              </TouchableOpacity>
            </View>
            <Text>
              <Text style={[globalStyles.font14, {color: '#585858'}]}>
                {workerName}
              </Text>
            </Text>
          </View>
          <View style={styles.box}>
            <View style={[styles.smBox, {backgroundColor: '#EFEEFF'}]}>
              <Text
                style={[
                  globalStyles.font14,
                  {marginTop: 3, marginLeft: 5, fontFamily: fonts.bold},
                ]}>
                $ {`${charges}`}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomBox}>
        <View style={styles.bottomsmBox}>
          <Text style={globalStyles.font14}>Date</Text>
          <Text style={[globalStyles.font12, {marginTop: 5, color: '#757575'}]}>
            {day}
          </Text>
        </View>
        <View style={styles.bottomsmBox}>
          <Text style={globalStyles.font14}>Time</Text>
          <Text style={[globalStyles.font12, {marginTop: 5, color: '#757575'}]}>
            {time}
          </Text>
        </View>
        <Pressable
          style={[
            styles.btn,
            {
              backgroundColor:
                type === 'completed'
                  ? '#E8F5EC'
                  : type === 'cancelled'
                  ? '#f9cfcf'
                  : '#FFF8E5',
            },
          ]}>
          <Text
            style={[
              globalStyles.font14,
              {
                fontFamily: fonts.medium,
                color:
                  type === 'completed'
                    ? '#49D17C'
                    : type === 'cancelled'
                    ? '#FB5353'
                    : '#F7893A',
                textTransform: "capitalize"
              },
            ]}>
            {type}
          </Text>
        </Pressable>

      </View>
      {
        type=='pending'?
        <Pressable style={[globalStyles.justifyCenter,
          {borderColor:'red',borderWidth:1,borderRadius:10,marginVertical:10,marginHorizontal:120,padding:5,color:'red'}]}
        // onPress={()=>{
        //   Alert.alert(
        //     'Cancel Booking',
        //     'Are you sure you want to cancel the booking?',
        //     [
        //       {
        //         text: 'Cancel',
        //         style: 'cancel',
        //       },
        //       {
        //         text: 'OK',
        //         onPress: async () => {
        //          const res = await update_status(id,"cancelled")
        //          if(res?.result)
        //           {ToastAndroid.showWithGravity('Booking Cancel', ToastAndroid.LONG, ToastAndroid.BOTTOM);
        //           fetchBookings();
        //         }
        //          else 
        //           ToastAndroid.showWithGravity('Booking Could not Cancel', ToastAndroid.LONG, ToastAndroid.BOTTOM);
        //         },
        //       },
        //     ],
        //     { cancelable: false }
        //   );
        // }}
        onPress={toggleCancelModal}
        >
        <Text style={{color:'red'}}>Cancel</Text>
        </Pressable>:null
      }
        {
        type=='completed' && rating==0 ?
        <Pressable style={[globalStyles.justifyCenter,
          {borderColor:'red',borderWidth:1,borderRadius:10,marginVertical:10,padding:5,color:'red',width:'80%',marginLeft:30}]}
        // onPress={()=>{
        //   Alert.alert(
        //     'Cancel Booking',
        //     'Are you sure you want to cancel the booking?',
        //     [
        //       {
        //         text: 'Cancel',
        //         style: 'cancel',
        //       },
        //       {
        //         text: 'OK',
        //         onPress: async () => {
        //          const res = await update_status(id,"cancelled")
        //          if(res?.result)
        //           {ToastAndroid.showWithGravity('Booking Cancel', ToastAndroid.LONG, ToastAndroid.BOTTOM);
        //           fetchBookings();
        //         }
        //          else 
        //           ToastAndroid.showWithGravity('Booking Could not Cancel', ToastAndroid.LONG, ToastAndroid.BOTTOM);
        //         },
        //       },
        //     ],
        //     { cancelable: false }
        //   );
        // }}
        onPress={()=>navigation.navigate('RatingReview',{bookingID:id})}
        >
        <Text style={{color:'red'}}>Rate and review</Text>
        </Pressable>:null
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCancelModalVisible}
        onRequestClose={() => {
          setIsCancelModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cancel Booking</Text>
            <Text style={styles.modalText}>Are you sure you want to cancel the booking?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={toggleCancelModal}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.okButton]} onPress={handleCancelBooking}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Pressable>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    alignSelf: 'center',
  },
  img: {
    height: scale(100),
    width: scale(100),
    resizeMode: 'center',
  },
  smBox: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    marginRight: 15,
  },

  box: {
    flexDirection: 'row',
  },
  bottomBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    // alignItems: 'center',
  },
  bottomsmBox: {
    width: 100,
    alignItems: 'center',
  },
  btn: {
    width: 100,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
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
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 100,
  },
  cancelButton: {
    marginRight: 10,
  },
  okButton: {
    marginLeft: 10,
  },
  modalButtonText: {
    textAlign: 'center',
    color: 'red',
  },
});
