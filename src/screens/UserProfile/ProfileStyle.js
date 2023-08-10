import {StyleSheet} from 'react-native';
import {fonts, colors} from '../../constants';
import {scale} from 'react-native-size-matters';
const profileStyle = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#0000009E',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 15,
  },
  wrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    width: '100%',
  },
  circle: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primaryColor,
    borderRadius: 20,
    alignSelf: 'flex-end',
    top: -25,
    left: 23,
    backgroundColor: colors.white,
  },
  btn: {
    width: '45%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.primaryColor,
    borderRadius: 10,
    borderWidth: 1,
  },
});
export default profileStyle;
