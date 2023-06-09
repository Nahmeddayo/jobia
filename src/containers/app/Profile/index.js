import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { width } from 'react-native-dimension';
import { images } from '../../../assets';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import TextField from '../../../components/TextFIeld';
import { colors } from '../../../constants/colors';
import ChangePasswordModal from './ChangePasswordModal';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import { constants } from '../../../constants/variables';
import Feather from "react-native-vector-icons/Feather"
import { helper } from '../../../helper';
import ImageCropPicker from 'react-native-image-crop-picker';
import { handleEditProfile } from '../../../redux/slices/Profile';

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector(state => state.ProfileSlice);
  const { loading, userProfile } = profile;
  const [image, setImage] = useState(userProfile?.userImage)
  const [input, setInput] = useState({
    name: userProfile?.name,
    email: userProfile?.email,
    phoneNumber: userProfile?.phoneNumber,
    address: userProfile?.phoneNumber,
    state: userProfile?.state,
    city: userProfile?.city,
    country: userProfile?.country,
    jobDescription: userProfile?.jobDescription
  });
  const handleChangeInput = (name, value) => {
    setInput({ ...input, [name]: value });
  };

  const noop = () => { }

  const handleUploadImage = () => {
    ImageCropPicker.openPicker({
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

  const handleUpdateProfile = () => {
    const { name, phoneNumber, address, state, city, country, jobDescription } = input;
    if (name === '') {
      constants.commonAlert.isVisible({
        status: 'error',
        message: 'First Name is required',
      });
    } else if (phoneNumber === '') {
      constants.commonAlert.isVisible({
        status: 'error',
        message: 'Contact Number is required ',
      });
    }
    else if (image === null) {
      constants.commonAlert.isVisible({
        status: 'error',
        message: 'Image is required ',
      });
    }
    else if (address === '') {
      constants.commonAlert.isVisible({
        status: 'error',
        message: 'Address is required ',
      });
    }
    else if (state === '') {
      constants.commonAlert.isVisible({
        status: 'error',
        message: 'State is required ',
      });
    }
    else if (city === '') {
      constants.commonAlert.isVisible({
        status: 'error',
        message: 'City is required ',
      });
    }
    else if (country === '') {
      constants.commonAlert.isVisible({
        status: 'error',
        message: 'Country is required ',
      });
    }
    else if (jobDescription === '') {
      constants.commonAlert.isVisible({
        status: 'error',
        message: 'Job description is required ',
      });
    }
    else {
      let payload = {
        ...input,
        userImage: image
      };
      dispatch(handleEditProfile(userProfile?._id, payload));
      setEdit(!edit);
    }
  };

  console.log(loading, userProfile, "userProfileuserProfileuserProfile")

  const renderValues = (heading, value) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.whiteColor,
          height: width(12),
          alignItems: 'center',
          marginHorizontal: width(5),
          marginVertical: width(3),
          borderRadius: 15,
          paddingLeft: width(10),
          elevation: 5,
          shadowColor: colors.primary,
          shadowOpacity: 1,
        }}>
        <Text style={{ color: colors.lightGrey }}>{heading}</Text>
        <Text style={{ marginLeft: width(3), color: colors.lightshGrey }}>
          {value}
        </Text>
      </View>
    );
  };
  return (
    <>
      <Loader isloading={loading} />
      <SafeAreaView style={{ backgroundColor: colors.blueish, flex: 1 }}>
        <Header heading="My Profile" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginVertical: width(10), alignItems: 'center', }}>
            <TouchableOpacity
              onPress={edit ? handleUploadImage : noop}
              style={{
                position: "relative"
              }}>
              <Image
                resizeMode="contain"
                style={{ height: 100, width: 100, borderRadius: 50 }}
                source={{ uri: image ? image : userProfile?.userImage }}
              />
              {
                edit ?
                  <View style={{
                    borderRadius: 50,
                    width: width(6),
                    height: width(6),
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    bottom: 5,
                    right: 0,
                    backgroundColor: colors.primary
                  }}>

                    <Feather name="edit-2" size={13} color="#fff" />
                  </View>
                  :
                  null
              }

            </TouchableOpacity>
            <Text
              style={{
                marginTop: width(2),
                fontWeight: '700',
                fontSize: 20,
                color: colors.lightshGrey2,
              }}>
              {userProfile?.name}
            </Text>
            {edit == false && (
              <TouchableOpacity onPress={() => setEdit(!edit)}>
                <Text
                  style={{
                    marginTop: width(2),
                    fontSize: 18,
                    color: colors.lightGrey,
                  }}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {!edit ? (
            <View>
              {renderValues('User Name', userProfile?.name)}
              {renderValues('Email', userProfile?.email)}
              {renderValues('Password', '********')}
              {renderValues('Phone No', userProfile?.phoneNumber)}
              {renderValues('Address', userProfile?.address)}
              {renderValues('Country', userProfile?.country)}
              {renderValues('State', userProfile?.state)}
              {renderValues('City', userProfile?.city)}
            </View>
          ) : (
            <View>
              <TextField
                value={input?.name}
                onChangeText={text => handleChangeInput('name', text)}
                placeholder={'Russel'} />
              <TextField
                value={input?.email}
                onChangeText={text => handleChangeInput('email', text)}
                placeholder={'russadams@gmail.com'}
                editable={false}
              />

              <TextField
                placeholder={'************'}
                showRightIcon
                onPressArrow={() => setOpenModal(true)}
              />
              <TextField
                value={input?.phoneNumber}
                onChangeText={text => handleChangeInput('phoneNumber', text)}
                keyboardType={"numeric"}
                placeholder={'+123456789'} />
              <View
                style={{
                  backgroundColor: colors.whiteColor,
                  marginHorizontal: width(5),
                  marginVertical: width(3),
                  height: width(12),
                  borderRadius: 15,
                  shadowColor: colors.primary,
                  shadowOpacity: 1,
                }}>
                <Picker
                  selectedValue={input.jobDescription}
                  onValueChange={(val) => setInput({
                    ...input,
                    jobDescription: val
                  })}
                  placeholder="Picker"
                  style={{
                    alignItems: 'center',
                    paddingLeft: width(10),
                  }}>
                  <Picker.Item label="Select Job Description" value="" />
                  <Picker.Item label="It & Computer" value="It & Computer" />
                  <Picker.Item label="Marketing" value="Marketing" />
                  <Picker.Item label="Mechanical" value="Mechanical" />
                  <Picker.Item label="Doctor" value="Doctor" />
                </Picker>
              </View>
              <TextField
                value={input?.address}
                onChangeText={text => handleChangeInput('address', text)}
                placeholder={'Some Street,Chicago'} />
              <TextField
                value={input?.country}
                onChangeText={text => handleChangeInput('country', text)}
                placeholder={'America'} />
              <TextField
                value={input?.state}
                onChangeText={text => handleChangeInput('state', text)}
                placeholder={'Illinois'} />
              <TextField
                value={input?.city}
                onChangeText={text => handleChangeInput('city', text)}
                placeholder={'Chicago'} />
              <Button
                heading={'Save'}
                onPress={() => handleUpdateProfile()}
                color={colors.primary}
              />
            </View>
          )}
        </ScrollView>
        <ChangePasswordModal openModal={openModal} setOpenModal={setOpenModal} />
      </SafeAreaView>
    </>
  );
};

export default Profile;
