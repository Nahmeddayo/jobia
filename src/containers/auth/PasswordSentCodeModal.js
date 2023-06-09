import React, {useState} from 'react';
import {Text, View, Image} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from './../../constants/colors';
import {width} from 'react-native-dimension';
import {useNavigation} from '@react-navigation/native';
import Button from './../../components/Button';
import {images, icons} from './../../assets/index';

function PasswordSentCodeModal({openModal, setOpenModal,onPress, messageText}) {
  console.log(openModal,"openModalopenModalopenModal");
  const navigation = useNavigation();
  return (
    <Modal
      style={{
        height: '100%',
        margin: 0,
        justifyContent: 'center',
        marginHorizontal: width(3),
      }}
      isVisible={openModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      onBackdropPress={() => {
        // ModalVisibility(false);
        // propsData = {}
      }}>
      <View
        style={{
          backgroundColor: colors.whiteColor,
          borderRadius: 40,
          paddingVertical: width(5),
          paddingHorizontal: width(4),
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            fontWeight: '700',
            color: colors.lightshGrey2,
          }}>
          {messageText}
        </Text>

        <View style={{alignItems: 'center', marginVertical: width(5)}}>
          <Image
            source={require('../../assets/icons/checked-circle.gif')}
            style={{width: width(40), height: width(30)}}
          />
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            fontWeight: '400',
            color: colors.lightshGrey2,
          }}>
          Please Check Your Registered Email.
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            fontWeight: '400',
            color: colors.lightshGrey2,
          }}>
          Thank You
        </Text>

        <View>
          <Button
            heading={'Enter Code'}
            color={colors.primary}
            onPress={() => {
              setOpenModal(false);
             onPress()
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

export default PasswordSentCodeModal;
