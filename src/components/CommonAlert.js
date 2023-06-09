import React, {useState} from 'react';
import {View, Text, TouchableOpacity,Image} from 'react-native';
import {width} from 'react-native-dimension';
import Modal from 'react-native-modal';
import { icons } from '../assets';
import {colors} from "../constants/colors"
import Button from "./Button"
let propsData = {};

const CommonAlert = React.forwardRef((props, ref) => {
  const [isVisible, ModalVisibility] = useState(false);

  
  React.useImperativeHandle(ref, () => ({
    isVisible(params) {
      propsData = params;
      ModalVisibility(true);
    },
    backdropPress() {
      ModalVisibility(false);
    },
  }));

  const handleButton=()=>{
    handleDelete(),
    ModalVisibility(false)
  }

  const {message,status,handleDelete} = propsData;
  return (
    <Modal
      style={{alignSelf: 'center', alignItems: 'center'}}
      isVisible={isVisible}
      animationIn="slideInLeft"
      animationOut="slideOutRight"
      backdropOpacity={0.5}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}>

      <View
        style={{
          width: width(86),
          backgroundColor: 'white',
          borderRadius: width(2),
          padding: width(8),
        }}>
            <View style={{alignSelf:"center"}}>
            {status== "ok" &&
            <Image source={require('../assets/icons/greencheck.png')} style={{height:width(25),width:width(25)}}/>}
            {status=="error" &&
            <Image source={icons.redCross} style={{height:width(12),width:width(12)}}/>}
            {status=="delete" &&
            <Image source={icons.redCross} style={{height:width(12),width:width(12)}}/>}
            </View>
        <Text
          style={{
            fontSize: 14,
            color: 'black',
            marginVertical: width(2),
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          {message}
        </Text>
        {status == "ok" &&
        <View style={{justifyContent:"center"}}>
            <Button
            onPress={()=>ModalVisibility(false)}
            color={colors.primary}
            heading={"OK"}
            textColor={colors.whiteColor}
            />
            </View>
            }
            {status == "error" &&
        <View style={{justifyContent:"center"}}>
            <Button
            onPress={()=>ModalVisibility(false)}
            color={colors.primary}
            heading={"OK"}
            textColor={colors.whiteColor}
            />
            </View>
            }
             {status == "delete" &&
          <View style={{flexDirection:"row"}}>
            <View style={{width:"50%"}}>
            <Button
            onPress={()=>ModalVisibility(false)}
            color={colors.black}
            heading={"Cancel"}
            textColor={colors.whiteColor}
            />
            </View>
            <View style={{width:"50%"}}>
            <Button
            onPress={handleButton}
            color={colors.primary}
            heading={"Yes"}
            textColor={colors.whiteColor}
            />
            </View>
            </View>
            }
      </View>
    </Modal>
  );
});

export default CommonAlert;
