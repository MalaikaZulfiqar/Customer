import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

const styles = StyleSheet.create({
  topBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 120,
    height: 120,
    resizeMode: 'center',
  },
  ratingBox: {
    backgroundColor: '#FFF8E5',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    width: 60,
  },
  btn: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: colors.primaryColor,
    borderWidth: 1,
    marginVertical: 15,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    backgroundColor:colors.primaryColor,
  },
});

export default styles;
