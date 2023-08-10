import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    width: '100%',
    alignSelf: 'center',
    marginTop: 30,
    backgroundColor: '#FFFFFF',
  },
  tabBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(40),
    backgroundColor: '#ffffff',
    width: scale(75),
    borderRadius: 10,
    elevation: 5,
  
  },
});
export default styles;
