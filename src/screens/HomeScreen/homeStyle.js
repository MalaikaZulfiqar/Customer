import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {colors, fonts} from '../../constants';

const homeStyles = StyleSheet.create({
  banner: {},
  img: {
    width: '100%',
    resizeMode: 'stretch',
    height: 160,
  },
  bannerText: {
    fontFamily: fonts.regular,
    fontSize: 20,
    color: colors.white,
    top: -145,
    left: 15,
  },
  btn: {
    backgroundColor: colors.white,
    width: 100,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    top: -120,
    left: 15,
  },
});
export default homeStyles;
