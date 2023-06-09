import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import Modal from 'react-native-modal';
import { width } from 'react-native-dimension';
import { useNavigation } from '@react-navigation/native';
import Button from '../../../components/Button';
import { colors } from '../../../constants/colors';
import TextField from '../../../components/TextFIeld';
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import { constants } from '../../../constants/variables';
import { changePasswordUser } from '../../../services/UserProfile';

function ChangePasswordModal({ openModal, setOpenModal }) {
  const navigation = useNavigation();

  const userProfile = useSelector(state => state.ProfileSlice.userProfile);
  const [isloading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChangeInput = (name, value) => {
    setInput({ ...input, [name]: value });
  };

  const handleChangePassword = () => {
    const { password, newPassword, confirmPassword } = input;
    if (password === '') {
      constants.commonAlert.isVisible({
        status: 'error',
        message: 'old Password is required',
      });
    } else if (newPassword === '') {
      constants.commonAlert.isVisible({
        status: 'error',
        message: 'New Password is required',
      });
    } else if (confirmPassword === '') {
      constants.commonAlert.isVisible({
        status: 'error',
        message: 'Confirm Password is required ',
      });
    } else if (confirmPassword !== newPassword) {
      constants.commonAlert.isVisible({
        status: 'error',
        message: 'Password does not match ',
      });
    } else {
      let paylaod = {
        email: userProfile?.email,
        password,
        newPassword,
      };
      changePasswordUser(paylaod)
        .then(response => {
          console.log(response?.data, 'data====>');
          setIsLoading(false);
          if (response?.status == 200) {
            constants.commonAlert.isVisible({
              status: 'ok',
              message: response?.data?.message,
            });
            setOpenModal(false)
            setInput({
              newPassword: '',
              password: '',
              confirmPassword: '',
            });

          } else {
            constants.commonAlert.isVisible({
              status: 'error',
              message: response?.data?.message,
            });
          }
        })
        .catch(error => {
          console.log(error, 'errrorr=======>');
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <Loader isloading={isloading} />
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
              fontSize: 20,
              marginVertical: width(4),
              fontWeight: '700',
              color: colors.lightshGrey2,
            }}>
            Change Password
          </Text>

          <TextField
            value={input?.password}
            onChangeText={text => handleChangeInput('password', text)}
            placeholder={'Old Password'} />
          <TextField
            value={input?.newPassword}
            onChangeText={text => handleChangeInput('newPassword', text)}
            placeholder={'New Password'} />
          <TextField
            value={input?.confirmPassword}
            onChangeText={text => handleChangeInput('confirmPassword', text)}
            placeholder={'Confirm Password'} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: width(43) }}>
              <Button
                heading={'Cancel'}
                showLeftArrow
                color={colors.lightshGrey2}
                textColor={colors.whiteColor}
                onPress={() => {
                  setOpenModal(false);
                }}
              />
            </View>
            <View style={{ width: width(43) }}>
              <Button
                heading={'Confirm'}
                color={colors.primary}
                onPress={() => {
                  handleChangePassword()
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>

  );
}

export default ChangePasswordModal;
