import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {width} from 'react-native-dimension';
import {icons} from '../assets';
import {colors} from '../constants/colors';
import { useSelector } from 'react-redux';
const HomeHeader = ({onPressAddress}) => {
  const navigation = useNavigation();
  // const location=useSelector(state=>state.LocationSlice.currentLocation)
  return (
    <View
      style={{
        height: width(30),
        justifyContent: 'center',
        backgroundColor: colors.primary,
      }}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={icons.sideBar} />
        </TouchableOpacity>
        <TouchableOpacity style={{}} onPress={onPressAddress}>
          <Text
            style={{
              color: colors.whiteColor,
              fontWeight: "bold",
              fontSize: 22,
            }}>
             Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;
