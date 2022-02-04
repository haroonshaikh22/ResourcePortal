import React, {useState, useEffect} from 'react';
import {Text, View, SafeAreaView, ToastAndroid,TouchableOpacity,TextInput,StyleSheet} from 'react-native';
import CustomNavigationBar from '../../components/CustomNavigationBar';
import {COLORS, FONTS, GLOBALSTYLES} from '../../constants/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Formik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';

const AddUserSetting = ({navigation}) => {
 
  const postUser = async values => {

    console.log('check------------->>>>', values);

    try {
      const token = await AsyncStorage.getItem('token');

      const requestOptions = {
        method: 'POST',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        headers: {Authorization: 'Bearer ' + token},
      };

      const {data} = await axios.post(
        'http://newresourcing.nimapinfotech.com/api/user',
        values,
        requestOptions,
      );

      console.log('check-------------->', data);
      if (data.message) {
        ToastAndroid.showWithGravity(
          'Project Target created successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
             navigation.goBack();

    } catch (err) {
      ToastAndroid.showWithGravity(
        'Project Target not created',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  
  };
  const handleSubmit = values => {
    postUser(values);
  };
  const loginValidationSchema = yup.object().shape({
    name: yup.string().required('These field is Required'),
    email: yup
    .string()
    .email('Email is not valid')
    .required('These field is Required'),
    type: yup
      .string()
      .required('These field is Required'),
   
  });
  return (
    <SafeAreaView style={styles.mainContainer}>
    <CustomNavigationBar back={true} headername="Add User Setting" />
    <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            name: '',
            email: '',
            type: '',
          }}
          enableReinitialize={true}
          onSubmit={values => {
            handleSubmit(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
            values,
          }) => (
            <>
   <View style={{height: hp('80%')}}>
                <View
                  style={{
                    width: wp('90%'),
                    height: hp('7%'),
                    margin: 5,
                    flexDirection: 'row',
                    backgroundColor: COLORS.pureWhite,
                    marginStart: 20,
                    borderRadius: 10,
                    marginTop: 10,
                  }}>
                  <TextInput
                    placeholder="Name*"
                    style={styles.textInput}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                  />
                </View>
                {errors.name && touched.name && (
                  <Text style={styles.errorStyle}>{errors.name}</Text>
                )}
              
                <View
                  style={styles.textInputView}>
                  <View
                    style={styles.innerBtn}>
                    <MaterialCommunityIcons
                      color={COLORS.lightBlue}
                      name="email-outline"
                      size={25}
                      style={styles.iconStyle}
                    />
                  </View>
                  <TextInput
                    placeholder="Email Id*"
                    style={styles.textInput}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                </View>
                {errors.email && touched.email && (
                  <Text style={styles.errorStyle}>{errors.email}</Text>
                )}
                  <View
                  style={{
                    width: wp('90%'),
                    height: hp('7%'),
                    margin: 5,
                    flexDirection: 'row',
                    backgroundColor: COLORS.pureWhite,
                    marginStart: 20,
                    borderRadius: 10,
                    marginTop: 10,
                  }}>
                  <TextInput
                    placeholder="Type*"
                    style={styles.textInput}
                    onChangeText={handleChange('type')}
                    onBlur={handleBlur('type')}
                  />
                </View>
                {errors.type && touched.type && (
                  <Text style={styles.errorStyle}>{errors.type}</Text>
                )}

              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => handleSubmit()}>
                  <Text style={styles.textStyle}>Submit</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  textInputView: {
    width: wp('90%'),
    height: hp('7%'),
    margin: 5,
    flexDirection: 'row',
    backgroundColor: COLORS.pureWhite,
    marginStart: 20,
    borderRadius: 10,
  },
  textInput: {
    marginHorizontal: 20,
    ...FONTS.appFontSemiBold,
    width: wp('80%'),
  },
  innerBtn: {
    justifyContent: 'center',
    borderRadius: 10,
    padding: 5,

    backgroundColor: COLORS.whiteBlue,
  },

  iconStyle: {
    right: 10,
    marginStart: 20,
  },
  buttonStyle: {
    backgroundColor: COLORS.skyBlue,
    width:wp('90%'),
     borderRadius: 10,
     alignSelf: 'center',
     bottom:0,
     position:'absolute'
   
  },
  textStyle: {
    alignSelf: 'center',
    ...FONTS.appFontSemiBold,
    marginVertical: 15,
    color: COLORS.pureWhite,
    fontWeight: 'bold',
  },
  errorStyle: {
    ...FONTS.appFontSemiBold,
    color: COLORS.red,
    textAlign: 'center',
  },
});
export default AddUserSetting;
