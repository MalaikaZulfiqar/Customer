import { ScrollView, TouchableOpacity, Text, View, FlatList, Image, Pressable, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import Container from '../../components/Container';
import HomeHeader from '../../components/HomeHeader';
import styles from './styles';
import Button from '../../components/Button';
import globalStyles from '../../styles/globalStyles';
import { colors } from '../../constants';
import BookingCard from '../../components/BookingCard';
import Home from '../HomeScreen';
import { get_booking } from '../../services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Bookings = ({ navigation }) => {
  const [active, setActive] = useState(0);
  const [loading, setloading] = useState(false);
  const [booking, setBooking] = useState([])
  const [result, setResult] = useState([])
  const Categories = ["all", "pending", "completed", "cancelled"]
  useEffect(() => {
    const unsubscribe=navigation.addListener('focus',()=>{
         fetchBookings()
    })
    return unsubscribe;
  }, [navigation])

  // useLayoutEffect(()=>{
  //   fetchBookings()
  // },[])
  const filteredBooking = (index) => {
    if (index == 0)
      setResult(booking)
    else {
      const filter = booking.filter((item) => item.status == Categories[index])
      setResult(filter)

    }
  }
  const fetchBookings = async () => {
    setloading(true)
    const userID = await AsyncStorage.getItem('userID');
    console.log(userID)
    const response = await get_booking(userID);
    if (response && response.data){
      const services = response.data;
      setResult(services);
      setBooking(services);
      setloading(false);
    }
   else{
    setloading(false);
    console.log('No  data available')
   }
    // console.log(services)
  }
  return (
    <Container customStyle={{ backgroundColor: '#F6F6F6', paddingHorizontal: 0 }}>
      <View style={{ paddingHorizontal: 15, backgroundColor: colors.white }}>
        <HomeHeader title={'My Bookings'} isBackTitle={true} />
        <View style={styles.tabContainer}>


          <ScrollView horizontal contentContainerStyle={styles.tabContainer}>
            {Categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tabBox,
                  {
                    backgroundColor:
                      active == index ? colors.primaryColor : colors.white,
                  },
                ]}
                onPress={() => {
                  setActive(index);
                  filteredBooking(index);
                }}>

                <Text
                  style={[
                    globalStyles.font14,
                    {
                      color: active == index ? colors.white : colors.black,
                      textTransform: "capitalize"
                    },
                  ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <ScrollView>
      { loading && <ActivityIndicator size={"large"} color={"black"} style={{flex:1,justifyContent:"center", alignItems:"center"}}/>}
      { booking.length === 0 && !loading ?
        <View style={{ alignItems: 'center', justifyContent: 'center', margin: 15 }}>
        <Image source={require('../../assets/images/png/no_booking.png')} />
        <Text style={{ color: '#B7B7B7', margin: 10 }}>Book Service and it will </Text>
        <Text style={{ color: '#B7B7B7' }}>show up here</Text>
       
        <Pressable style={{backgroundColor:colors.primaryColor,padding:15, margin: 10,borderRadius:8}}
        onPress={()=>navigation.navigate('Home')} >
              <Text style={{color:colors.white}}> Book a Service</Text>
        </Pressable>
      </View>:
      <View style={{ marginTop: 20, paddingHorizontal: 15 }}>
        <View>
          {
            result.map((item,index)=> 
              <BookingCard 
                charges={item.services.price}
                key={index}
                //workerName={item.services.cat_name.name}
                img={item.services.thumb}
                title={item.services.name}
                day={item.booking_time[0].day}
                time={item.booking_time[0].time}
                type={item.status}
                id={item.id}
                rating={item.rating}
                fetchBookings={fetchBookings}
              />
              )
            
          }
        </View>
      </View>
      }
 </ScrollView>

    </Container>
  );
};

export default Bookings;
