import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, FlatList, Image, ScrollView } from 'react-native';
import Header from '../../../components/Header';
import { useRef } from 'react';
import { colors } from '../../../constants/colors';
import { width } from 'react-native-dimension';
import Button from '../../../components/Button';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
const JobDetails = ({ route }) => {
  const ref = useRef();
  const navigation = useNavigation();
  const data = route?.params?.data;
  return (
    <View style={{ flex: 1, backgroundColor: colors.blueish }}>
      <Header heading={'Job Details'} />
      <ScrollView
        style={{ marginBottom: width(4) }}
        showsVerticalScrollIndicator={false}>
        <View>
          <View>
            <Image
              source={{ uri: data?.compnayDetails?.userImage }}
              style={{ height: width(40), width: width(100),marginTop:width(2), }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: width(4),
              marginHorizontal: width(2),
            }}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: colors.primary,
                }}>
                {data?.jobTitle}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Entypo name="heart" size={30} color={colors.primary} />
              </View>
              <View style={{ marginLeft: width(3) }}>
                <Fontisto
                  name="bookmark-alt"
                  size={30}
                  color={colors.primary}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              backgroundColor: colors.whiteColor,
              marginHorizontal: width(2),
              paddingVertical: width(3),
              elevation: 4,
              borderRadius: 10,
              marginTop: width(2),
            }}>
            <View style={{ marginHorizontal: width(2) }}>
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 18,
                  fontWeight: '600',
                  textDecorationLine: 'underline',
                }}>
                Company Details
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontSize: 16,
                  fontWeight: '600',
                  marginTop: width(2),
                }}>
                Name : {data?.company}
              </Text>
              <View>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: 16,
                    fontWeight: '600',
                    marginTop: width(0.5),
                  }}>
                  Address : {data?.fullAddress}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: width(2) }}>
              <View style={{ marginHorizontal: width(2) }}>
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 18,
                    fontWeight: '600',
                    textDecorationLine: 'underline',
                  }}>
                  Job Details
                </Text>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: 16,
                    fontWeight: '600',
                    marginTop: width(2),
                  }}>
                  Job Type : {data?.jobType}
                </Text>
                {
                  (data?.minSalary && data?.maxSalary) ?
                    <Text
                      style={{
                        color: colors.black,
                        fontSize: 16,
                        fontWeight: '600',
                        marginTop: width(2),
                      }}>
                      Salary : {data?.minSalary + ` To ` + data?.maxSalary}
                    </Text>
                    :
                    null
                }

                <Text
                  style={{
                    color: colors.black,
                    fontSize: 16,
                    fontWeight: '600',
                    marginTop: width(2),
                  }}>
                  Job Posted : {data?.date}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: width(2),
              }}>
              <View style={{ marginHorizontal: width(2) }}>
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 18,
                    fontWeight: '600',
                    textDecorationLine: 'underline',
                  }}>
                  Job Description
                </Text>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: 16,
                    fontWeight: '600',
                    marginTop: width(2),
                    textAlign: 'justify',
                  }}>
                  {data?.description}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: width(2),
              }}>
              <View style={{ marginHorizontal: width(2) }}>
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 18,
                    fontWeight: '600',
                    textDecorationLine: 'underline',
                  }}>
                  Requiremants
                </Text>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: 16,
                    fontWeight: '600',
                    marginTop: width(2),
                    textAlign: 'justify',
                  }}>
                  {data?.requirements}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: width(2) }}>
          <Button heading={'Apply Now'} color={colors.primary} />
        </View>
      </ScrollView>
    </View>
  );
};

export default JobDetails;
