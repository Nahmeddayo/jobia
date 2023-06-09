import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import HomeHeader from '../../../components/HomeHeader';
import { useRef } from 'react';
import JobCard from '../../../components/jobCard';
import { colors } from '../../../constants/colors';
import { width } from 'react-native-dimension';
import { handleGetUserProfile } from '../../../redux/slices/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs } from '../../../services/Jobs';

const Jobs = [
  {
    jobTitle: 'Software Engineer',
    company: '10 Pearls',
    fullAddress:
      '9th floor, Parsa Tower, Main Shahrah-e-Faisal, Block 6 PECHS, Karachi',
    description:
      'Are you experienced and looking for a challenging role where you can learn lots more and enhance your skills? We are looking for an experienced, self-motivated & exceptional software engineer with experience in developing innovative Internet applications.',
    requirements:
      'React Development with backend experience in PHP. Experience in back-end and front-end technologies. Build products with JavaScript, HTML, and CSS. Strengths in back-end technologies, PHP and working with a database like MySQL React Development with backend experience in PHP. Experience in back-end and front-end technologies. Build products with JavaScript, HTML, and CSS. Strengths in back-end technologies, PHP and working with a database like MySQL. Advanced working knowledge of PHP, databases like MySQL, experience with popular frameworks is a plus.',
    minSalary: '9000',
    maxSalary: '150000',
    date: '70',
    jobType: 'Full Time',
    isMultipleHirirng: true,
    isUrgentHiring: true,
    image:
      'https://www.technologistan.pk/wp-content/uploads/2021/05/Systems-Ltd-feature-image-new-logo-2019-696x391.jpg',
  },
  {
    jobTitle: 'Software Engineer',
    company: '10 Pearls',
    fullAddress:
      '9th floor, Parsa Tower, Main Shahrah-e-Faisal, Block 6 PECHS, Karachi',
    description:
      'Are you experienced and looking for a challenging role where you can learn lots more and enhance your skills? We are looking for an experienced, self-motivated & exceptional software engineer with experience in developing innovative Internet applications.',
    requirements:
      'React Development with backend experience in PHP. Experience in back-end and front-end technologies. Build products with JavaScript, HTML, and CSS. Strengths in back-end technologies, PHP and working with a database like MySQL React Development with backend experience in PHP. Experience in back-end and front-end technologies. Build products with JavaScript, HTML, and CSS. Strengths in back-end technologies, PHP and working with a database like MySQL. Advanced working knowledge of PHP, databases like MySQL, experience with popular frameworks is a plus.',
    minSalary: '9000',
    maxSalary: '150000',
    date: '70',
    jobType: 'Full Time',
    isMultipleHirirng: true,
    isUrgentHiring: true,
    image:
      'https://www.technologistan.pk/wp-content/uploads/2021/05/Systems-Ltd-feature-image-new-logo-2019-696x391.jpg',
  },

];
const Home = () => {
  const ref = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const user = useSelector(state => state.LoginSlice.user)
  const [jobsData, setJobsData] = useState([])

  useEffect(() => {
    dispatch(handleGetUserProfile(user._id))
    getJobsData()
  }, [])

  
  const getJobsData = async () => {
    try {
        const response = await getJobs()
        let allJobs = response?.data?.data || []
        setJobsData(allJobs)
    } catch (error) {
        console.log(error)
    }
}



  return (
    <View style={{ flex: 1, backgroundColor: colors.blueish }}>
      <HomeHeader onPressAddress={() => ref.current.isVisible({})} />
      <FlatList
        data={jobsData}
        style={{ marginTop: width(5) }}
        contentContainerStyle={{
          flexGrow:1
        }}
        ListEmptyComponent={()=>{
          return(
            <View style={{
              flex:1,
              justifyContent:"center",
              alignItems:"center"
            }}>
              <Text style={{
                fontSize:18,
                color:"#000"
              }}>No jobs found</Text>
              </View>
          )
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('JobDetails', {
                  data: item,
                })
              }>
              <View style={{ marginVertical: width(2), marginHorizontal: width(2) }}>
                <JobCard data={item} />
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
    </View>
  );
};

export default Home;
