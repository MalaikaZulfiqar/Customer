import {StyleSheet} from 'react-native';
import {fonts, colors} from '../../constants/index';
import {scale} from 'react-native-size-matters';
const signupStyle = StyleSheet.create({
    leftIconBox: {
        position: 'absolute',
        zIndex: 1,
        right: 15,
        top: 18,
        height: scale(50),
      },
      textInput: {
        height: scale(50),
        borderRadius: 15,
        marginBottom: 13,
        paddingLeft: 55,
        fontSize: 16,
        color: colors.black,
        fontFamily: fonts.regular,
        backgroundColor: '#F3F3F3',
        flex: 1,
        paddingRight: 45,
        borderWidth: 1,
      },
      iconBox: {
        width: 20,
        height: 20,
        resizeMode: 'center',
        position: 'absolute',
        zIndex: 1,
        left: 25,
        top: 19,
      },
      inputBox: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center',
      },
});

export default signupStyle;
