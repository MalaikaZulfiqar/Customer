import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import Arrow from '../assets/images/svg/arrow.svg';
import Bell from '../assets/images/svg/bell.svg';
import Menu from '../assets/images/svg/menu.svg';
import Add from '../assets/images/svg/add.svg';
import Delete from '../assets/images/svg/delete.svg';

import {useNavigation, DrawerActions} from '@react-navigation/native';

const Header = ({screenName}) => {
  const navigation = useNavigation();
  const navigateBack = () => {
    navigation.canGoBack() ? navigation.goBack() : null;
  };
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleClick = () => {
    if (screenName == 'home') {
      navigation.navigate('Notifications');
    } else if (screenName == 'add') {
      navigation.navigate('AddCustomService');
    }
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.box}
        onPress={screenName == 'home' ? openDrawer : navigateBack}>
        {screenName && screenName == 'home' ? <Menu /> : <Arrow />}
      </TouchableOpacity>
      {screenName && (
        <TouchableOpacity style={styles.box} onPress={handleClick}>
          {screenName == 'home' ? (
            <Bell />
          ) : screenName == 'add' ? (
            <Add />
          ) : (
            <Delete />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 5,
  },
  box: {
    backgroundColor: '#F2F2F2',
    width: scale(45),
    height: scale(45),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
