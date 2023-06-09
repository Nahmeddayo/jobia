import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {width} from 'react-native-dimension';
import {icons, images} from '../assets';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../constants/colors';

const Header = ({heading, cart, headingStyle}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: width(30),
        backgroundColor: colors.primary,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{position: 'absolute', left: 15}}>
          <Ionicons
            name="arrow-back"
            resizeMode="contain"
            size={25}
            color={colors.whiteColor}
            onPress={() => navigation.goBack()}
          />
      </View>
      <View style={{marginLeft: width(20)}}>
        <Text style={{color:colors.whiteColor,fontSize:22,fontWeight:"700"}}>{heading}</Text>
      </View>

      {cart && (
        <View style={{position: 'absolute', right: 15}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={{marginRight: width(4)}}>
            <Image
              resizeMode="contain"
              style={{height: 40, width: 40}}
              source={icons.shoppingCartBlack}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

Header.defaultProps = {
  headingStyle: {fontSize: 30, fontWeight: '600', color: colors.lightshGrey},
};

export default Header;
