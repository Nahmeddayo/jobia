import React, { useState } from 'react';
import {
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { width } from 'react-native-dimension';
import { icons, images } from '../../assets';
import Button from '../../components/Button';
import { colors } from '../../constants/colors';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../components/Loader';
import { registerUser, sendCode } from '../../services/Authentication';
import { constants } from '../../constants/variables';
// import { registerDriver, sendCode } from '../../services/auth/Auth';
const styles = StyleSheet.create({
  codeFieldRoot: { marginTop: width(6), justifyContent: 'space-evenly' },
  cell: {
    width: width(15),
    height: width(15),
    lineHeight: width(15),
    fontSize: 35,
    borderRadius: 10,
    elevation: 8,
    backgroundColor: colors.whiteColor,
    textAlign: 'center',
    color: colors.lightGrey,
  },
  focusCell: {
    borderColor: colors.primary,
  },
});

const CELL_COUNT = 4;
const VerifyCode = ({ route }) => {
  const refrence = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [value, setValue] = useState('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [code, setCode] = useState('');
  const [isloading, setIsLoading] = useState(false)
  const navigation = useNavigation();
  const data = route?.params?.data
  console.log(data, "data===========>")

  const handleSignup = () => {
    const {
      name,
      email,
      phoneNumber,
      password,
      image
    } = data
    const payload = {
      name,
      email,
      phoneNumber,
      code,
      password,
      userImage: image,
      role: "Candidate"
    }
    if (code == "") {
      constants.commonAlert.isVisible({
        status: "error",
        message: "Verification code is required"
      })
    } else {
      setIsLoading(true)
      registerUser(payload).then((response) => {
        setIsLoading(false)
        console.log(response?.data, "dattttttttttttaaaa");
        if (response.status == 200) {
          constants.commonAlert.isVisible({
            status: "ok",
            message: response?.data?.message
          })
          navigation.navigate('Login')
        } else {
          constants.commonAlert.isVisible({
            status: "error",
            message: response?.data?.message
          })
        }
      }).catch((error) => {
        setIsLoading(false)
        console.log(error, "errorrrrrrrrrr");
        constants.commonAlert.isVisible({
          status: "error",
          message:  error.message
        })
      })
    }
    }

    const handleSendCode = () => {
      const payload = { email: data?.email }
      setIsLoading(true)
      sendCode(payload).then((response) => {
        setIsLoading(false)
        // console.log(response.data,"responseresponseresponse");
        if (response?.status == 200) {
          constants.commonAlert.isVisible({
            status: "ok",
            message: response?.data?.message
          })
          navigation.navigate('VerifyCode', {
            data: data
          })
        }
        else {
          constants.commonAlert.isVisible({
            status: "error",
            message: response?.data?.message
          })
        }
      }).catch((error) => {
        console.log(error, "errorerror");
        setIsLoading(false)
        constants?.commonAlert.isVisible({
          message: error.message,
          status: "error"
        })
      })
    }
    return (
      <>
        <Loader isloading={isloading} />
        <SafeAreaView
          style={{
            backgroundColor: colors.blueish,
            flex: 1,
          }}>
          <View style={{ alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={{ width: width(60), height: width(50) }}
              source={images.logoImage}
            />
            <View style={{ marginTop: width(2) }}>
              <Text style={{ color: colors.lightGrey }}>
                We have sent a verification code to
              </Text>
              <Text
                style={{
                  color: colors.black,
                  alignSelf: 'center',
                  fontWeight: '600',
                }}>
                Email
              </Text>
            </View>
          </View>
          <View>
            <CodeField
              ref={refrence}
              {...props}
              value={code}
              onChangeText={setCode}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>
          <View style={{ alignItems: 'center', marginTop: width(5) }}>
            <Text style={{ color: colors.lightGrey }}>Didn't receive the code?</Text>
          </View>
          <TouchableOpacity
            onPress={handleSendCode}
            style={{
              alignItems: 'center',
              marginTop: width(2),
              marginBottom: width(8),
            }}
          >
            <Text
              style={{
                color: colors.black,
                textDecorationLine: 'underline',
                fontSize: 14,
                fontWeight: '600',
              }}>
              Send code again
            </Text>
          </TouchableOpacity>
          <View style={{ marginHorizontal: width(3), marginVertical: width(2) }}>
            <Button
              onPress={handleSignup}
              heading={'Done'}
              color={colors.primary}
            />
          </View>
          {/* <View style={{ alignItems: 'center', marginTop: width(5) }}>
          <Text style={{ color: colors.lightGrey }}>
            Sign in with another number
          </Text>
        </View> */}
        </SafeAreaView>
      </>
    );
  };

  export default VerifyCode;
