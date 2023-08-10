import React, {useState, useEffect} from 'react';
import Container from '../../components/Container';
import {
  ScrollView,
  View,
  StyleSheet
} from 'react-native';
import HomeHeader from '../../components/HomeHeader';
import SearchBar from '../../components/SearchBar';
import {colors} from '../../constants';
import Card from '../../components/Card';
import ServiceDetail from '../ServiceDetail';

const AllServices = ({navigation, route}) => {
  const [Services, setServices] = useState(route.params.services);
  
  return (
    <Container customStyle={{backgroundColor: '#F6F6F6', paddingHorizontal: 0}}>
      <View style={{backgroundColor: colors.white, paddingHorizontal: 15}}>
        <HomeHeader screenName={'home'} />
        <View style={{marginTop: 30, marginBottom: 4}}>
          <SearchBar placeholder={'Search title,description'} />
        </View>
      </View>
      <ScrollView>
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
    </Container>
  )
}

export default AllServices

const styles = StyleSheet.create({})