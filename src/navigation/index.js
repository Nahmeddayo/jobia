import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import DrawerNaviagtor from "./drawer/Drawer"
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/slices/Login';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from '../components/Loader';
import { colors } from '../constants/colors';
import { View } from "react-native"

export default function Navigation() {
  const [isloading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const user = useSelector(state => state.LoginSlice.user)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000);
    getUserData();
  }, []);

  const getUserData = async () => {
    let data = await AsyncStorage.getItem('user');
    data = JSON.parse(data);
    dispatch(setUserData(data));
  };

  return (
    <>
      <Loader isloading={isloading} />
      {
        isloading ?
          <View style={{ backgroundColor: colors.blueish, flex: 1 }}></View>
          :
          <NavigationContainer>
            {
              user
                ?
                <DrawerNaviagtor />
                :
                <AuthStack />
            }
          </NavigationContainer>
      }
    </>
  );
}