import {StyleSheet} from 'react-native';
import {colors, fonts} from '../constants/index';

const globalStyles = StyleSheet.create({
  justifyBtw: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  justifyBtwRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  justifyCenterRow: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 28,
    color: colors.black,
    fontFamily: fonts.bold,
    marginTop: 10,
  },
  box: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 30,
  },
  font12: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: colors.black,
    lineHeight: 18,
  },
  font13: {
    fontSize: 13,
    fontFamily: fonts.regular,
    color: colors.black,
  },
  font14: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.black,
    lineHeight: 18,
  },
  font16R: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.black,
  },

  font16M: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.black,
  },
  font16B: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  font18R: {
    fontSize: 18,
    fontFamily: fonts.regular,
    color: colors.black,
  },
  font18M: {
    fontSize: 18,
    fontFamily: fonts.medium,
    color: colors.black,
  },
  font18B: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  font20R: {
    fontSize: 20,
    fontFamily: fonts.regular,
    color: colors.black,
  },
  font20M: {
    fontSize: 20,
    fontFamily: fonts.medium,
    color: colors.black,
  },
  font20B: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  font22B: {
    fontSize: 22,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  font24R: {
    fontSize: 24,
    fontFamily: fonts.regular,
    color: colors.black,
  },
  font24M: {
    fontSize: 24,
    fontFamily: fonts.medium,
    color: colors.black,
  },
  font24B: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  font28B: {
    fontSize: 28,
    fontFamily: fonts.bold,
    color: colors.black,
  },
});
export default globalStyles;
