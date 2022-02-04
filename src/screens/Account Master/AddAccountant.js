import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomNavigationBar from '../../components/CustomNavigationBar';
import {COLORS, FONTS, GLOBALSTYLES} from '../../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Formik} from 'formik';
import {URL} from '../../constants/configure';
import axios from 'axios';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddAccountant = ({navigation}) => {
  const phoneRegExp =
    /^(\+91)?(-)?\s*?(91)?\s*?(\d{3})-?\s*?(\d{3})-?\s*?(\d{4})$/;
  const loginValidationSchema = yup.object().shape({
    name: yup.string().required('These field is Required'),
    phone: yup
      .string()
      .matches(phoneRegExp, 'Please enter a vald number')
      .required('These field is Required'),
    email: yup
      .string()
      .email('Email is not valid')
      .required('These field is Required'),
  });
  //post
  const postUser = async values => {
    console.log(values);
    try {
      const token = await AsyncStorage.getItem('token');

      const requestOptions = {
        method: 'POST',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        headers: {Authorization: 'Bearer ' + token},
      };

      const {data} = await axios.post(
        URL.ACCOUNTMASTERPOST_URL,
        values,
        requestOptions,
      );

      console.log('check-----------', data);

      if (data.message) {
        ToastAndroid.showWithGravity(
          'Accounts created successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
      navigation.goBack();
    } catch (err) {
      ToastAndroid.showWithGravity(
        'Accounts not created',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };
  const handleSubmit = values => {
    postUser(values);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <CustomNavigationBar back={true} headername="Add Accountant" />
      <View style={styles.container}>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{name: '', phone: '', email: ''}}
          onSubmit={handleSubmit}>
          {({handleChange, handleBlur, handleSubmit, errors, touched}) => (
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
                    <FontAwesome
                      color={COLORS.lightBlue}
                      name="phone"
                      size={30}
                      style={styles.iconStyle}
                    />
                  </View>
                  <TextInput
                    placeholder="Mobile*"
                    style={styles.textInput}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                  />
                </View>
                {errors.phone && touched.phone && (
                  <Text style={styles.errorStyle}>{errors.phone}</Text>
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
      </View>
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
export default AddAccountant;
