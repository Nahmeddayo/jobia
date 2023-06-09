import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import TextField from "../../components/TextFIeld";
import { colors } from "../../constants/colors";
import Button from "../../components/Button";
import { icons, images } from "../../assets";
import { width } from "react-native-dimension";
import { useNavigation } from "@react-navigation/native"
import { helper } from "../../helper";
import ImagePicker from 'react-native-image-crop-picker';
import { constants } from "../../constants/variables";
import { sendCode } from "../../services/Authentication";
import Loader from "../../components/Loader";
const Register = () => {
    const navigation = useNavigation()
    const [image, setImage] = useState(null);
    const [isloading, setIsLoading] = useState(false)
    const [inputValues, setInputValues] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
    })
    const handleChangeInputs = (name, value) => {
        setInputValues({ ...inputValues, [name]: value });
    };


    const handleUploadImage = () => {
        ImagePicker.openPicker({
            mediaType: 'photo',
            //   width: 300,
            //   height: 400,
            freeStyleCropEnabled: true,
            cropping: true,
        })
            .then(res => {
                console.log(res.path.file, 'asalskdjsalkd');
                let params = {
                    uri: res.path,
                    type: res.mime,
                    name: res.path,
                };
                uploadFunction(params);

            })
            .catch(err => { });
    };

    const uploadFunction = async params => {
        try {
            let imageUrl = await helper.ImageUploadService(params);
            console.log(params, "jdkdjdjkjdj");
            imageUrl.json().then(result => {
                setImage(result.url)
            });
        } catch (error) {
            console.log(error, "error");
        }
    };

    const handleSendCode = async () => {
        const { name, email, phoneNumber, password } = inputValues
        if (image == null) {
            constants?.commonAlert.isVisible({
                message: 'Please select profile image',
                status: "error"
            })
        } else if (name == "") {
            constants?.commonAlert.isVisible({
                message: 'Full name is required',
                status: "error"
            })
        } else if (email == "") {
            constants?.commonAlert.isVisible({
                message: 'Email is required',
                status: "error"
            })
        } else if (phoneNumber == "") {
            constants?.commonAlert.isVisible({
                message: 'Phone number is required',
                status: "error"
            })
        }
        else if (password == "") {
            constants?.commonAlert.isVisible({
                message: 'Password is required',
                status: "error"
            })
        } else if (!email.includes("@")) {
            constants?.commonAlert.isVisible({
                message: 'Please enter a valid email address',
                status: "error"
            })
        } else if (password.length < 6) {
            constants?.commonAlert.isVisible({
                message: 'Password should be atleast 6 characters',
                status: "error"
            })
        }
        else if (phoneNumber.length < 11) {
            constants?.commonAlert.isVisible({
                message: 'Enter a valid phone number',
                status: "error"
            })
        }
        else {
            setIsLoading(true);
            let payload = {
                email
            }
            try {
                let response = await sendCode(payload)
                if (response.status == 200) {
                    setIsLoading(false);
                    constants?.commonAlert.isVisible({
                        message: response.data.message,
                        status: "ok"
                    })
                    navigation.navigate("VerifyCode", { data: { image, name, email, phoneNumber, password } })
                    setInputValues({
                        name: "",
                        email: "",
                        phoneNumber: "",
                        password: ""
                    })
                    setImage(null)
                } else {
                    setIsLoading(false);
                    constants?.commonAlert.isVisible({
                        message: response.data.message,
                        status: "error"
                    })
                }
            } catch (error) {
                console.log(error, "errorerrorerror")
                setIsLoading(false);
                constants?.commonAlert.isVisible({
                    message: error.message,
                    status: "error"
                })
            }
        }

    }

    console.log(image, "imageeeeeeeeeeeeee");

    return (
        <>
            <Loader isloading={isloading} />
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.blueish }}>
                <ScrollView>

                    <View style={{ marginTop: width(5) }}>
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
                        <TouchableOpacity
                            style={{
                                height: width(12),
                                backgroundColor: colors.whiteColor,
                                marginHorizontal: width(5),
                                marginVertical: width(2.5),
                                borderRadius: 15,
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderColor: colors.lightshGrey,
                                position: 'relative',
                                elevation: 5,
                                shadowColor: colors.primary
                            }}>
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
                                    style={{ height: 25, width: 25 }}
                                    source={icons?.Account}
                                />
                            </View>
                            <View>
                                <TextInput
                                    style={{ marginLeft: width(4) }}
                                    placeholder="Profile Picture"
                                    placeholderTextColor={colors.lightBorder}
                                    editable={false}
                                />
                            </View>

                            {image == null ? (
                                <TouchableOpacity
                                    onPress={handleUploadImage}
                                    style={{
                                        marginLeft: width(3),
                                        borderRadius: 5,
                                        position: 'absolute',
                                        right: 10,
                                        backgroundColor: colors.primary,
                                        elevation: 5,
                                        paddingVertical: width(0.5),
                                        paddingHorizontal: width(4),
                                        borderColor: colors.lightshGrey,
                                    }}>
                                    <Text style={{ fontSize: 13, color: colors.whiteColor }}>Upload</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={handleUploadImage}
                                    style={{
                                        marginLeft: width(3),
                                        position: 'absolute',
                                        right: 10,
                                        borderColor: colors.lightshGrey,
                                    }}>
                                    <Image
                                        source={{ uri: image }}
                                        style={{ width: width(20), height: width(8) }}
                                    />
                                </TouchableOpacity>
                            )}
                        </TouchableOpacity>
                        <TextField showIcon image={icons.Account} placeholder={'Name'}
                            value={inputValues.name}
                            onChangeText={value => handleChangeInputs('name', value)}
                        />
                        <TextField showIcon image={icons.Account} placeholder={'Email'}
                            value={inputValues.email}
                            onChangeText={value => handleChangeInputs('email', value)}
                        />
                        <TextField showIcon image={icons.Account} placeholder={'Phone Number'}
                            secureTextEntry={false} keyboardType={"numeric"}
                            value={inputValues.phoneNumber}
                            onChangeText={value => handleChangeInputs('phoneNumber', value)}
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
                        <Text style={{ color: colors.lightGrey }}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{ color: colors.primary }}>SignIn</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: width(4) }}>
                        <Button onPress={handleSendCode} heading={'Sign Up'} color={colors.primary} />
                    </View>
                </ScrollView>

            </SafeAreaView>
        </>
    )
}

export default Register