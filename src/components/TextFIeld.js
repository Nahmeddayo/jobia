import React, {useState} from 'react';
import {View, TextInput, Image, TouchableOpacity} from 'react-native';
import {width} from 'react-native-dimension';
import {} from '../assets';
import {colors} from '../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TextField = ({
  placeholder,
  showIcon,
  secureTextEntry,
  image,
  showRightIcon,
  onPressArrow,
  keyboardType,
  value,
  onChangeText,
  editable,
  multiline,
  height,
  maxLength
}) => {
  const [secure, setSecure] = useState(secureTextEntry);
  return (
    <View
      style={{
        height: height,
        backgroundColor: colors.whiteColor,
        marginHorizontal: width(5),
        marginVertical: width(3),
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        elevation:5,
        shadowColor:colors.primary,
        shadowOpacity:1,
      }}>
      {showIcon && (
        <View
          style={{
            backgroundColor: '#666666',
            height: 25,
            width: 25,
            marginLeft: width(3),
            borderRadius: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            resizeMode="contain"
            style={{height: 25, width: 25}}
            source={image}
          />
        </View>
      )}

      <View style={{flexDirection: 'row', paddingRight: width(7)}}>
        <TextInput
          secureTextEntry={secure}
          style={{marginLeft: width(4), flex: 1,color:colors.black}}
          placeholder={placeholder}
          placeholderTextColor={colors.lightGrey}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          multiline={multiline}
          numberOfLines={10}
          maxLength={maxLength}
        />
        <TouchableOpacity
          style={{
            alignItems: 'flex-end',
            // flex: 1,
            marginRight: showIcon ? width(8) : 0,
            justifyContent: 'center',
          }}>
          {secure == false ? (
            <Feather name="eye" onPress={() => setSecure(!secure)} size={22} />
          ) : secure == true ? (
            <Feather
              name="eye-off"
              onPress={() => setSecure(!secure)}
              size={22}
            />
          ) : null}
        </TouchableOpacity>
        {showRightIcon && (
          <TouchableOpacity
            style={{
              alignItems: 'flex-end',
              flex: 1,
              justifyContent: 'center',
            }}>
            <MaterialIcons
              name="keyboard-arrow-right"
              onPress={onPressArrow}
              size={24}
              color={colors.lightGrey}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
TextField.defaultProps = {
  keyboardType: 'default',
  height: width(12),
};
export default TextField;
