import {StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';
import globalStyles from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {colors} from '../constants';
import {useNavigation} from '@react-navigation/native';
const AuthHeader = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.authHeaderStyle}
      onPress={() => {
        navigation.canGoBack() ? navigation.goBack() : null;
      }}>
      <Icon name="arrow-left" color={colors.white} size={18} />
      <Text
        style={[
          globalStyles.font16R,
          {color: colors.white, marginTop: 3, marginLeft: 10},
        ]}>
        Back
      </Text>
    </Pressable>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  authHeaderStyle: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
  },
});
