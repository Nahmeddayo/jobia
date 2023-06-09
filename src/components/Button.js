import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import {width} from 'react-native-dimension';
import {icons} from '../assets';

const Button = ({
  heading,
  onPress,
  color,
  textColor,
  showLeftArrow,
  marginVertical,
}) => {
  return (
    <TouchableOpacity
      style={{
        height: width(12),
        backgroundColor: color,
        marginHorizontal: width(5),
        marginVertical: marginVertical,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation:5,
      }}
      onPress={onPress}>
      <Text
        style={{
          color: textColor,
          fontSize: 18,
          fontWeight: '600',
        }}>
        {heading}
      </Text>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  textColor: 'white',
  marginVertical: width(3),
};

export default Button;
