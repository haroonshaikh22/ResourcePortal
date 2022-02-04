import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  ToastAndroid,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import CustomNavigationBar from '../../components/CustomNavigationBar';
import {COLORS,FONTS, GLOBALSTYLES} from '../../constants/theme';
import {Formik} from 'formik';
import {URL} from '../../constants/configure';
import axios from 'axios';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
const AddTechnology = ({navigation}) => {

  const loginValidationSchema = yup.object().shape({
    technology: yup.string().required('Please fill out this filed'),
    url: yup.string().required('Please fill out this filed'),
  });
  //post
  const postUser = async values => {
    // console.log('check=--------',values);
    try {
      const token = await AsyncStorage.getItem('token');

      const requestOptions = {
        method: 'POST',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        headers: {Authorization: 'Bearer ' + token},
      };

      const {data} = await axios.post(
       'http://newresourcing.nimapinfotech.com/api/technology',
        values,
        requestOptions,
      );
      // console.log(data);
      if (data.message) {
        ToastAndroid.showWithGravity(
          'Technology Added Successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
      navigation.goBack();

    } catch (err) {
      ToastAndroid.showWithGravity(
        'technology not created',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };
  const handleSubmit = values => {
    postUser(values);
  };


  return (
    <SafeAreaView style={GLOBALSTYLES.mainContainer}>
      <CustomNavigationBar back={true} headername="Add Technology" />
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{technology: '', url: ''}}
            onSubmit={handleSubmit}>
            {({handleChange, handleBlur, handleSubmit, errors, touched}) => (
              <>
                <View style={{ width: wp('90%'),
    height: hp('7%'),
    margin: 5,
    marginStart: 20,
    backgroundColor: COLORS.pureWhite,
    borderRadius: 10,marginTop:10}}>
                  <TextInput
                    placeholder="Name*"
                    style={GLOBALSTYLES.textInput}
                    onChangeText={handleChange('technology')}
                    onBlur={handleBlur('technology')}
                  />
                </View>
                {errors.technology && touched.technology && (
                  <Text style={GLOBALSTYLES.errorStyle}>
                    {errors.technology}
                  </Text>
                )}

                <View style={GLOBALSTYLES.textInputView}>
                  <TextInput
                    placeholder="URL"
                    style={GLOBALSTYLES.textInput}
                    onChangeText={handleChange('url')}
                    onBlur={handleBlur('url')}
                  />
                </View>
                {errors.url && touched.url && (
                  <Text style={GLOBALSTYLES.errorStyle}>{errors.url}</Text>
                )}
                <TouchableOpacity
                  style={GLOBALSTYLES.buttonStyle}
                  onPress={handleSubmit}>
                  <Text style={GLOBALSTYLES.textStyle}>Submit</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
       
    </SafeAreaView>
  );
};

export default AddTechnology;