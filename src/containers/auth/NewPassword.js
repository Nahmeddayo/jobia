import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { width } from 'react-native-dimension';
import { images } from '../../assets';
import Button from '../../components/Button';
import TextField from '../../components/TextFIeld';
import { colors } from '../../constants/colors';
// import {resetPassword} from '../../services/auth/Auth';
import { constants } from '../../constants/variables';
import Loader from '../../components/Loader';
import PasswordResetSuccessModal from './PasswordResetSuccessModal';
import { resetPasswordUser } from '../../services/Authentication';

const NewPassword = props => {
  const navigation = useNavigation();
  const [openModal, setOpenModal] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    email: props.route?.params?.email,
    password: '',
    confirmPassword: '',
    code: '',
  });

  const onPress = () => {
    setOpenModal(true);
  };

  const handleChnageInput = (name, value) => {
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleForgetPassword = () => {
    const { email, password, confirmPassword, code } = input;
    let payload = {
      email,
      password,
      otp: code,
    };
    if (password === '') {
      constants.commonAlert.isVisible({
        status: 'error',
        message: 'Password is required',
      });
    } else if (confirmPassword === '') {
      constants.commonAlert.isVisible({
        status: 'error',
        message: 'Confirm password is required',
      });
    } else if (confirmPassword !== password) {
      constants.commonAlert.isVisible({
        status: 'error',
        message: 'Passwords do not match',
      });
    } else if (code === '') {
      constants.commonAlert.isVisible({
        status: 'error',
        message: 'Code is required ',
      });
    } else {
      setIsLoading(true);
      resetPasswordUser(payload)
        .then(response => {
          console.log(response?.data, 'datattattatt');
          setIsLoading(false);
          if (response?.status == 200) {
            setOpenModal(true);
          } else {
            constants.commonAlert.isVisible({
              status: 'error',
              message: response?.data?.message,
            });
          }
        })
        .catch(error => {
          setIsLoading(false);
          console.log(error, 'errror');
        });
    }
  };

  return (
    <>
      <Loader isloading={isloading} />
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.blueish }}>
        <ScrollView>

          <View
            style={{
              alignItems: 'center',
              marginTop: width(3),
            }}>
            <Image
              resizeMode="contain"
              style={{ height: width(60), width: width(55) }}
              source={images.logoImage}
            />
          </View>
          <View style={{ marginTop: width(2) }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 24,
                color: colors.lightshGrey,
              }}>
              New Password
            </Text>
          </View>

          <View style={{ marginTop: width(15) }}>
            <TextField
              placeholder={'Email Address'}
              value={input?.email}
              onChangeText={text => handleChnageInput('email', text)}
              editable={false}
            />
            <TextField
              placeholder={'Password'}
              value={input?.password}
              onChangeText={text => handleChnageInput('password', text)}
              secureTextEntry={true}
            />
            <TextField
              placeholder={'Confirm Password'}
              value={input?.confirmPassword}
              onChangeText={text => handleChnageInput('confirmPassword', text)}
              secureTextEntry={true}
            />
            <TextField
              placeholder={'Reset Password Code'}
              value={input?.code}
              onChangeText={text => handleChnageInput('code', text)}
              keyboardType="numeric"
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginHorizontal: width(7),
            }}>
            <Text style={{ color: colors.lightGrey }}>Did not recevice yet?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={{ color: colors.lightshGrey }}> Resend</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: width(2) }}>
            <Button
              onPress={handleForgetPassword}
              heading={'Done'}
              color={colors.primary}
            />
          </View>

          <PasswordResetSuccessModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            messageText={'Password has been reset successfully'}
          />
        </ScrollView>

      </SafeAreaView>
    </>
  );
};

export default NewPassword;
