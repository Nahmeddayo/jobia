import React, {useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import DrawerItems from './DrawerItem';
import {height, width} from 'react-native-dimension';
import {colors} from '../../constants/colors';
import Octicons from 'react-native-vector-icons/Octicons';
import {icons, images} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';

function DrawerContent(props) {
  const navigation = useNavigation();
  const user = useSelector(state => state.LoginSlice.user)

  const mainNav = [
    {name: 'Home', route: 'Home'},
    {name: 'Profile', route: 'Profile'},
  ];


  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        paddingTop: 0,
      }}
      {...props}
      style={{
        borderTopRightRadius: width(30),
        backgroundColor: colors.whiteColor,
        flex: 1,
      }}>
      <View style={styles.drawerContent}>
        <View
          style={{
            height: width(47),
            justifyContent: 'flex-end',
          }}>
          {/* <TouchableOpacity
            style={{position: 'absolute', top: 10, right: 10}}
            onPress={() => props.navigation.toggleDrawer()}>
            <Octicons name="three-bars" size={22} color="white" />
          </TouchableOpacity> */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 400 / 2,
                marginBottom: width(2),
                overflow: 'hidden',
                marginHorizontal: width(3),
                marginLeft: width(5),
              }}>
              <Image
                source={{uri:user?.userImage}}
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
              />
            </View>
            <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
              <Image
                style={{
                  width: width(7),
                  height: width(7),
                  marginRight: width(6),
                }}
                source={icons.crossIcon}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: 'flex-end',
              borderBottomWidth: width(0.3),
              borderBottomColor: colors.darkGrey,
              marginLeft: width(5),
            }}>
            <Text
              style={{
                marginHorizontal: width(3),
                fontSize: 24,
                color: colors.primary,
                fontWeight: 'bold',
              }}>
              {user?.name}
            </Text>
          </View>
        </View>

        <View style={{marginTop: 10}}>
          {mainNav.map((item, index) => {
            return (
              <>
                <DrawerItems
                  iconName={item.route}
                  title={item.name}
                  key={index}
                  navigation={props.navigation}
                  focused={props.state.index === index ? true : false}
                  props={props}
                />
              </>
            );
          })}
        </View>
      </View>
      <DrawerItems
        iconName="Log out"
        title={'Log out'}
        navigation={props.navigation}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  underline: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: "white",
  },
  userInfoScreen: {
    alignItems: 'center',
    marginTop: 10,
  },
});

export default DrawerContent;
