import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity ,TextInput,Pressable} from 'react-native';
//import { MaterialIcons } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { add_rating } from '../services/ApiService';
import { useRoute } from '@react-navigation/native';
import { colors, fonts } from '../constants';
import Button from './Button'
import AsyncStorage from '@react-native-async-storage/async-storage';
const RatingReview=({route, navigation})=> {
  const [starRating, setStarRating] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const { bookingID } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const handleRating = async() =>{
    const userID=await AsyncStorage.getItem('userID');
    const response=await add_rating(starRating,reviewText ,userID,bookingID);
     if (response.result===true){
      console.log(starRating);
      console.log(reviewText);
      console.log(userID);
      console.log(bookingId);
     }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* <Text style={styles.heading}>{starRating ? `${starRating}*` : 'Tap to rate'}</Text> */}
        <View style={styles.stars}>
          <TouchableOpacity onPress={() => setStarRating(1)}>
            <Icon
              name={starRating >= 1 ? 'star' : 'star'}
              size={32}
              style={starRating >= 1 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarRating(2)}>
            <Icon
              name={starRating >= 2 ? 'star' : 'star'}
              size={32}
              style={starRating >= 2 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarRating(3)}>
            <Icon
              name={starRating >= 3 ? 'star' : 'star'}
              size={32}
              style={starRating >= 3 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarRating(4)}>
            <Icon
              name={starRating >= 4 ? 'star' : 'star'}
              size={32}
              style={starRating >= 4 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStarRating(5)}>
            <Icon
              name={starRating >= 5 ? 'star' : 'star'}
              size={32}
              style={starRating >= 5 ? styles.starSelected : styles.starUnselected}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
          style={styles.reviewInput}
          multiline
          numberOfLines={4}
          placeholder="Write your review..."
          value={reviewText}
          onChangeText={text => setReviewText(text)}
        />
        <Button
            btnName={isLoading ? <ActivityIndicator color={colors.btnColor} /> : 'Login'}
            onPress={handleRating}

          />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
     marginTop:20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
  },
  starUnselected: {
    color: '#aaa',
  },
  starSelected: {
    color: '#ffb300',
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '90%',
    maxHeight: 120,
    marginTop:20,
    padding:5,
    margin:4,
    marginLeft:13
  }
});
export default RatingReview;