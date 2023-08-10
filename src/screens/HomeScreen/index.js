import React, {useState, useEffect, useLayoutEffect} from 'react';
import Container from '../../components/Container';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import HomeHeader from '../../components/HomeHeader';
import SearchBar from '../../components/SearchBar';
import banner from '../../assets/images/png/banner.png';
import homeStyles from './homeStyle';
import globalStyles from '../../styles/globalStyles';
import {colors} from '../../constants';

import CategoryBox from '../../components/CategoryBox';
import Card from '../../components/Card';
import { getCategories, getServices } from '../../services/ApiService';

const Home = ({navigation}) => { 
  const [Categories, setCategories] = useState([]);
  const [Services, setServices] = useState([]);
  const [lenght, setLenght] = useState(3);
  
  const fetchCategories = async () => {
    const response = await getCategories()
    setCategories(response.data)
  }

  const fetchServices = async () => {
    const response = await getServices()
      setServices(response.data);  
  }

  useLayoutEffect(()=>{
     fetchCategories();
     fetchServices();
  },[])


  return (
    <Container customStyle={{backgroundColor: '#F6F6F6', paddingHorizontal: 0}}>
      <View style={{backgroundColor: colors.white, paddingHorizontal: 15}}>
        <HomeHeader screenName={'home'} />
        <View style={{marginTop: 30, marginBottom: 4}}>
          <SearchBar placeholder={'Search title,description'} />
        </View>
      </View>
      <View style={{flex: 1, paddingHorizontal: 15}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{height: 160, marginTop: 30}}>
            <Image source={banner} style={homeStyles.img} />
            <Text style={homeStyles.bannerText}>
              What Services do {'\n'} you need?
            </Text>
            
          </View>
          <View style={[globalStyles.justifyBtwRow, {marginVertical: 25}]}>
            <Text style={globalStyles.font16R}>Category</Text>
            <TouchableOpacity
              onPress={() => {
                setLenght(lenght => (lenght === 3 ? Categories.length : 3));
              }}>
              <Text style={[globalStyles.font14, {color: colors.primaryColor}]}>
                {lenght <= 3 ? 'See All' : 'See Less'}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            {Categories.map(
              (item, index) =>
                index <= lenght && (
                  <CategoryBox
                    key={index}
                    boxName={item.name}
                    bg={item.background_color_code}
                    img={item.thumb.replaceAll(" ","%20")}
                  />
                ),
            )}
          </View>
          <View style={[globalStyles.justifyBtwRow, {}]}>
            <Text style={globalStyles.font16R}>Services</Text>
            <TouchableOpacity onPress={() => navigation.navigate("AllServices", {services:Services})}>
              <Text style={[globalStyles.font14, {color: colors.primaryColor}]}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 15}}>
            {Services.map((item, index) =>
              <Card
                title={item.name}
                //categoryName={item.cat_name.name}
                // off={'17%'}
                favorite={false} //pass property of item to affect Heart Icon
                img={item.thumb}
                rating={'0'}
                key={index}
                charges={item.price}
                onPress={() => {
                  navigation.navigate('ServiceDetail', {title: item.cat_name.name, service:item});
                }}
              />
              )}
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};

export default Home;
