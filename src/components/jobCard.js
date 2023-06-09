import React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { width } from "react-native-dimension"
import { colors } from "../constants/colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const JobCard = ({ data }) => {
    console.log(data.compnayDetails.userImage, "datadatadatadatadata")
    return (
        <View style={{ backgroundColor: colors.whiteColor, borderRadius: 10, elevation: 5, width: width(95), }}>
            <View>
                <Image source={{ uri: data?.compnayDetails?.userImage }} style={{
                    width: width(95),
                    height: width(30),
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    resizeMode: "contain"
                }} />
            </View>
            <View style={{ marginLeft: width(4), marginVertical: width(3), }}>
                <View style={{ flexDirection: "row", marginVertical: width(2) }}>
                    <View style={{ marginRight: width(2) }}>
                        <SimpleLineIcons
                            name="badge"
                            color={colors.primary}
                            size={20}
                        />
                    </View>
                    <Text style={{
                        color: colors.primary,
                        fontSize: 18,
                        fontWeight: "700",
                    }}>{data?.jobTitle}</Text>
                </View>
                <View>
                    <Text style={{
                        color: colors.lightBorder,
                        fontSize: 14,
                        fontWeight: "700",
                    }}>{data?.company}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: width(2) }}>
                    <View style={{ marginRight: width(2) }}>
                        <AntDesign
                            name="clockcircle"
                            size={20}
                            color={colors.primary}
                        />
                    </View>
                    <Text style={{
                        color: colors.black,
                        fontSize: 14,
                        fontWeight: "500"
                    }}>{data?.jobType}</Text>
                </View>
                {
                    (data?.minSalary && data?.maxSalary) ?
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: width(2) }}>
                            <View style={{ marginRight: width(2) }}>
                                <FontAwesome5
                                    name="money-bill-wave"
                                    size={20}
                                    color={colors.primary}
                                />
                            </View>
                            <Text style={{
                                color: colors.black,
                                fontSize: 14,
                                fontWeight: "500"
                            }}>{data?.minSalary} To {data?.maxSalary}</Text>
                        </View>
                        :
                        null
                }

                {data?.isMultipleHirirng &&
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: width(2) }}>
                        <View style={{ marginRight: width(2) }}>
                            <FontAwesome
                                name="group"
                                size={20}
                                color={colors.primary}
                            />
                        </View>
                        <Text style={{
                            color: colors.black,
                            fontSize: 14,
                            fontWeight: "500"
                        }}>Multiple Hiring</Text>
                    </View>
                }
                {data?.isUrgentHiring &&
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: width(2) }}>
                        <View style={{ marginRight: width(2) }}>
                            <Ionicons
                                name="alarm"
                                size={20}
                                color={colors.primary}
                            />
                        </View>
                        <Text style={{
                            color: colors.black,
                            fontSize: 14,
                            fontWeight: "500"
                        }}>Urgent Hiring</Text>
                    </View>

                }
                <View style={{ flexDirection: "row", alignSelf: "flex-end", marginRight: width(5), alignItems: "center" }}>
                    <View>
                        <Entypo
                            name="heart"
                            size={30}
                            color={colors.primary}
                        />
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
        </View>
    )
}

export default JobCard