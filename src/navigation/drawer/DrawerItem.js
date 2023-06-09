import React, { useContext } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';
import { width } from 'react-native-dimension';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useSelector, useDispatch} from 'react-redux';
// import {setUserData} from '../../redux/slices/Login';
import { icons } from '../../assets';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Entypo from "react-native-vector-icons/Entypo"
import { useDispatch } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserData } from '../../redux/slices/Login';

const DrawerItem = props => {
  const { title, iconName, navigation } = props;
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    dispatch(setUserData(null));
  };
  const renderIcon = () => {
    switch (iconName) {
      case 'Home':
        return (
          <MaterialIcons
            style={{ marginRight: 10, marginLeft: 10, height: 20, width: 20 }}
            name="dashboard"
            resizeMode="contain"
            color={colors.primary}
            size={22}
          />
        );

      case 'Profile':
        return (
          <Entypo
            style={{ marginRight: 10, marginLeft: 10 }}
            name="user"
            resizeMode="contain"
            color={colors.primary}
            size={22}
          />
        );
      case 'MyWallet':
        return (
          <Image
            style={{ marginRight: 10, marginLeft: 10, height: 20, width: 20 }}
            name="dashboard"
            resizeMode="contain"
            color={colors.primary}
            size={22}
            source={icons.favourites}
          />
        );
      case 'Shift':
        return (
          <Image
            style={{ marginRight: 10, marginLeft: 10, height: 20, width: 20 }}
            name="dashboard"
            resizeMode="contain"
            color={colors.primary}
            size={22}
            source={icons.rewards}
          />
        );
      case 'Vouchers':
        return (
          <Image
            style={{ marginRight: 10, marginLeft: 10, height: 20, width: 20 }}
            name="dashboard"
            resizeMode="contain"
            color={colors.primary}
            size={22}
            source={icons.voucher}
          />
        );
      case 'TermsAndConditions':
        return (
          <Image
            style={{ marginRight: 10, marginLeft: 10, height: 20, width: 20 }}
            name="dashboard"
            resizeMode="contain"
            color={colors.primary}
            size={22}
            source={icons.terms}
          />
        );
      case 'Settings':
        return (
          <Image
            style={{ marginRight: 10, marginLeft: 10, height: 20, width: 20 }}
            name="dashboard"
            resizeMode="contain"
            color={colors.primary}
            size={22}
            source={icons.settings}
          />
        );
      case 'Log out':
        return (
          <MaterialCommunityIcons
            style={{ marginRight: 10, marginLeft: 10, }}
            name="logout"
            color={colors.primary}
            size={22}
          />
        );
      default:
        return null;
    }
  };

  const onPress = () => {
    if (iconName == 'Log out') {
      handleLogout();
    } else {
      navigation.navigate(iconName);

    }
  };
  return (
    <TouchableOpacity style={{ height: 50 }} onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          borderBottomWidth: width(0.3),
          borderBottomColor: colors.darkGrey,
          marginLeft: width(5),
        }}>
        <View style={{ width: '20%' }}>{renderIcon()}</View>
        <Text style={{ color: colors.primary, fontWeight: '600' }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DrawerItem;
