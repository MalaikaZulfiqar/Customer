import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
//import { Ionicons } from '@expo/vector-icons'; // You can use your desired icon library
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../constants';
import { scale } from 'react-native-size-matters';
import signupStyle from './signupStyle ';
import Account from '../../assets/images/svg/account.svg';
import Phone from '../../assets/images/svg/phone.svg';
import Email from '../../assets/images/svg/mail.svg';
import Location from '../../assets/images/svg/location.svg';
import NotificationCard from '../../components/NotificationCard';
import Container from '../../components/Container';
import PhoneInput from 'react-native-phone-number-input';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { profile } from '../../services/ApiService';
const ShippingDetails = ({ route, navigation }) => {
    const [data,setData]=useState([])
    const [detail,setDetail]=useState({
        name:'',
        email:'',
        phone:'',
        location:'',
        lat:'',
        lon:''


    })
    const fetchData=async()=>{
        const userID=await AsyncStorage.getItem('userID');
        const response=await profile(userID);
        if (response.data){
            const services=response.data;
            setData(services)
        }
    }
    useEffect(()=>{

    fetchData();
    },[]
    )
    return (
        <Container style={{ marginTop: 15 }}>


            <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 15 }}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" color={colors.black} size={18} />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={{ color: colors.black, fontSize: 20 }}>Shipping Details</Text>
                </View>
                <View>

                </View>
            </View>
            {data.map((item,index)=>
             <View style={{marginTop:12}}>
             <View style={signupStyle.inputBox}>
                 <View style={signupStyle.iconBox}>
                     <Account />
                 </View>
                 <TextInput
                     placeholder={'Name'}
                      value={item.name}
                     onChangeText={text => {
                        const updatedData = [...data]; // Create a copy of the data array
                        updatedData[index].name = text; // Update the specific item's name
                        setData(updatedData);
                        
                         
                     }}
                     style={[
                         signupStyle.textInput,
                          { borderColor: detail.email ? colors.primaryColor : '#F3F3F3' }
                     ]}
                 />

             </View>
             <View style={signupStyle.inputBox}>
                 <View style={signupStyle.iconBox}>
                     <Email />
                 </View>
                 <TextInput
                     placeholder={'Email'}
                      value={item.email}
                     onChangeText={text => {
                        const updatedData = [...data]; 
                        updatedData[index].email = text; 
                        setData(updatedData);
                        console.log(text)
                     }}
                     style={[
                         signupStyle.textInput,
                          { borderColor: detail.email ? colors.primaryColor : '#F3F3F3' }
                     ]}
                 />

             </View>
             <View style={{ borderRadius: 12, backgroundColor: '#F3F3F3', marginBottom: 20 }}>
                <PhoneInput
                  value={item.phone}
                  //defaultValue={data.phone}
                  textContainerStyle={{ backgroundColor: '#F3F3F3' }}
                  textInputStyle={{ padding: 12 }}
                  onChangeFormattedText={(text) => {
                    setData({ ...data, phone: text });
                    //validatePhoneNumber(text);
                  }}

                />
              </View>

              <View style={signupStyle.inputBox} >
                <View style={signupStyle.iconBox}>
                  <Location />
                </View>
                <GooglePlacesAutocomplete
                  placeholder='Search location'
                  returnKeyType={'default'}
                  fetchDetails={true}
                  //currentLocation = {true}
                  isRowScrollable={true}
                  keepResultsAfterBlur={false}
                  enablePoweredByContainer={false}
                  styles={{

                    textInputContainer: {
                      marginTop: 0,
                    },
                    textInput: {
                      height: scale(50),
                      borderRadius: 15,
                      marginBottom: 13,
                      paddingLeft: 55,
                      fontSize: 16,
                      color: colors.black,
                     // fontFamily: fonts.regular,
                      backgroundColor: '#F3F3F3',
                      flex: 1,
                      paddingRight: 45,
                      borderWidth: 1,
                      borderColor: data.location ? colors.primaryColor : '#F3F3F3'
                    },
                    predefinedPlacesDescription: {
                      color: '#1faadb',
                    },
                    listView: {
                      position: 'relative',
                      zIndex: 3,
                      marginTop: 0,
                      padding: 0
                    },
                    row: {
                      backgroundColor: '#FFFFFF',
                      height: 100,
                      flexDirection: 'row',
                    },
                    separator: {
                      height: 0.5,
                      backgroundColor: '#c8c7cc',
                    },
                    description: {},
                    loader: {
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      height: 20,
                    },
                  }}
                  onPress={({description}, details) => {
                    if (details) {
                      const { geometry } = details;
                      const { location } = geometry;

                      const latitude = location.lat;
                      const longitude = location.lng;
                       
                       console.log('Latitude:', latitude);
                       console.log('Longitude:', longitude);
                      // setData({...data,location:description,lng:longitude,lat:latitude})
                       //console.log(data.location)
                     
                    }
                  }}
                  query={{
                    key: 'AIzaSyBqwk2I_l08r0RFRQSmOSqDj1Y5TIYCNO8',
                    language: 'en',
                  }}
                />
              </View>

         </View>
            )}
            
        </Container>
    )
}

export default ShippingDetails

const styles = StyleSheet.create({})