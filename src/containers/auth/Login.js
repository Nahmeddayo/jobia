import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from "react-native";
import TextField from "../../components/TextFIeld";
import { colors } from "../../constants/colors";
import Button from "../../components/Button";
import { icons, images } from "../../assets";
import { width } from "react-native-dimension";
import { useNavigation } from "@react-navigation/native"
import Loader from "../../components/Loader";
import { constants } from "../../constants/variables";
import { loginUser } from "../../services/Authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserData } from "../../redux/slices/Login";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  })
  const [isloading, setIsLoading] = useState(false)


  const handleChangeInputs = (name, value) => {
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleLogin = () => {

    const { email, password } = inputValues;
    if (email == '') {
      constants?.commonAlert.isVisible({
        message: "Email is required",
        status: "error"
      })
    } else if (password == '') {
      constants?.commonAlert.isVisible({
        message: "Password is required",
        status: "error"
      })
    } else {
      setIsLoading(true)
      let payload = {
        email,
        password,
      };
      loginUser(payload)
        .then(response => {
          if (response.status !== 200) {
            constants?.commonAlert.isVisible({
              message: response?.data?.message,
              status: "error"
            })
            setIsLoading(false)
          } else {
            setInputValues({
              email: '',
              password: '',
            });
            let newObj = {
              ...response.data.data.userDetails,
            };
            AsyncStorage.setItem('user', JSON.stringify(newObj));
            dispatch(setUserData(newObj));
            setIsLoading(false)
          }
        })
        .catch(err => {
          console.log(err, "error");
          setIsLoading(false)
          constants?.commonAlert.isVisible({
            message: err.message,
            status: "error"
          })
        });
    }
  }

  return (
    <>
      <Loader isloading={isloading} />
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.blueish }}>
        <ScrollView>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 24,
              color: colors.primary,
              marginTop: width(20),
              top: 30,
            }}>
            Welcome to
          </Text>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              style={{ height: width(60), width: width(55) }}
              source={images.logoImage}
            />
          </View>
          <View style={{ marginTop: width(5) }}>
            <TextField showIcon image={icons.Account} placeholder={'Email'}
              value={inputValues.email}
              onChangeText={value => handleChangeInputs('email', value)}

            />
            <TextField
              showIcon
              image={icons.lockWithbackground}
              placeholder={'Password'}
              secureTextEntry={true}
              value={inputValues.password}
              onChangeText={value => handleChangeInputs('password', value)}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginHorizontal: width(7),
            }}>
            <Text style={{ color: colors.lightGrey }}>Forgot Password: </Text>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={{ color: colors.primary }}>Click Here</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: width(4) }}>
            <Button onPress={handleLogin} heading={'Sign in'} color={colors.primary} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginHorizontal: width(7),
            }}>
            <Text style={{ color: colors.lightGrey }}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{ color: colors.primary }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </SafeAreaView>
    </>
  )
}

export default Login