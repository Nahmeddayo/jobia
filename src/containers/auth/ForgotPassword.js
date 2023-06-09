import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { width } from 'react-native-dimension';
import { icons, images } from '../../assets';
import Button from '../../components/Button';
import TextField from '../../components/TextFIeld';
import { colors } from '../../constants/colors';
import PasswordSentCodeModal from './PasswordSentCodeModal';
import { constants } from '../../constants/variables';
import Loader from '../../components/Loader';
import { sendCode } from '../../services/Authentication';
const ForgotPassword = () => {
  const navigation = useNavigation();
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isloading, setIsLoading] = useState(false);

  const handleForgetPassword = () => {
    // setOpenModal(!openModal);
    let payload = {
      email: email,
    };
    if (email == '') {
      constants.commonAlert.isVisible({
        status: 'error',
        message: 'Email is required ',
      });
    } else {
      setIsLoading(true);
      sendCode(payload)
        .then(response => {
          console.log(response, 'response');
          setIsLoading(false);
          setOpenModal(!openModal);
        })
        .catch(error => {
          setIsLoading(false);
          constants.commonAlert.isVisible({
            status: 'error',
            message: error.response?.data?.message,
          });
          console.log(error, 'errrorr');
        });
    }
  };

  const handleOnPressEnterCode = () => {
    navigation.navigate('NewPassword', {
      email: email,
    });
  };

  return (
    <>
      <Loader isloading={isloading} />
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.blueish }}>
        <ScrollView>

          <View
            style={{
              alignItems: 'center',
              marginTop: width(15),
            }}>
            <Image
              resizeMode="contain"
              style={{ height: width(60), width: width(55) }}
              source={images.logoImage}
            />
          </View>
          <View style={{ marginTop: width(6) }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 24,
                color: colors.lightshGrey,
              }}>
              Reset Password
            </Text>
          </View>
          <View
            style={{
              marginTop: width(1),
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                color: colors.lightGrey,
                paddingHorizontal: width(16),
              }}>
              Enter your registered email and we'll send you a code to reset your
              password
            </Text>
          </View>
          <View style={{ marginTop: width(20) }}>
            <TextField
              showIcon
              image={icons.Account}
              placeholder={'Email Address'}
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={{ marginTop: width(2) }}>
            <Button
              onPress={handleForgetPassword}
              heading={'Confirm'}
              color={colors.primary}
            />
          </View>
          <PasswordSentCodeModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            onPress={handleOnPressEnterCode}
            messageText={"Password Reset Code has been sent to your email"}
          />
        </ScrollView>

      </SafeAreaView>
    </>
  );
};

export default ForgotPassword;
