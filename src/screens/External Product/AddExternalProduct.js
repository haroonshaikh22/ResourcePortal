import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  ToastAndroid,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CustomNavigationBar from '../../components/CustomNavigationBar';
import {COLORS, FONTS, GLOBALSTYLES} from '../../constants/theme';
import {Formik} from 'formik';
import {URL} from '../../constants/configure';
import axios from 'axios';
import * as yup from 'yup';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddExternalProduct = ({navigation}) => {
  const postUser = async values => {
    // console.log('check--------------',values);
    try {
      const token = await AsyncStorage.getItem('token');

      const requestOptions = {
        method: 'POST',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        headers: {Authorization: 'Bearer ' + token},
      };

      const {data} = await axios.post(
        URL.EXTERNALPRODUCTPOST_URL,
        values,
        requestOptions,
      );

      // console.log(data);

      if (data.status) {
        ToastAndroid.showWithGravity(
          'External Product Added Successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
      navigation.goBack();
    } catch (err) {
      ToastAndroid.showWithGravity(
        'externalProduct not created',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };
  const handleSubmit = values => {
    postUser(values);
  };

  const loginValidationSchema = yup.object().shape({
    name: yup.string().required('Please fill out this filed'),
    url: yup.string().required('Please fill out this filed'),
    description: yup.string().required('Please fill out this filed'),
  });
  // navigation = useNavigation();

  return (
    <SafeAreaView style={GLOBALSTYLES.mainContainer}>
      <CustomNavigationBar back={true} headername="Add External Product" />

      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{name: '', url: '', description: ''}}
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
                  // justifyContent: 'space-between',
                  backgroundColor: COLORS.pureWhite,
                  marginStart: 20,
                  borderRadius: 10,
                  marginTop: 10,
                }}>
                <TextInput
                  placeholder="Name*"
                  style={GLOBALSTYLES.textInput}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                />
              </View>
              {errors.name && touched.name && (
                <Text style={GLOBALSTYLES.errorStyle}>{errors.name}</Text>
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

              <View
                style={{
                  width: wp('90%'),
                  height: hp('15%'),
                  margin: 5,
                  marginStart: 20,
                  backgroundColor: COLORS.pureWhite,
                  borderRadius: 10,
                }}>
                <TextInput
                  placeholder="Description"
                  style={GLOBALSTYLES.textInput}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                />
              </View>
              {errors.description && touched.description && (
                <Text style={GLOBALSTYLES.errorStyle}>{errors.description}</Text>
              )}
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={GLOBALSTYLES.buttonStyle}
                onPress={() => handleSubmit()}>
                <Text style={GLOBALSTYLES.textStyle}>Submit</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};
// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//   },
//   textInputView: {
//     width: wp('90%'),
//     height: hp('7%'),
//     margin: 5,
//     flexDirection: 'row',
//     // justifyContent: 'space-between',
//     backgroundColor: COLORS.pureWhite,
//     marginStart: 20,
//     borderRadius: 10,
//   },
//   textInput: {
//     marginHorizontal: 20,
//     ...FONTS.appFontSemiBold,
//   },

//   iconStyle: {
//     right: 10,
//     marginStart: 20,
//   },

//   buttonStyle: {
//     backgroundColor: COLORS.skyBlue,
//     width: wp('90%'),
//     height: hp('7%'),
//     borderRadius: 10,
//     alignSelf: 'center',
//     position: 'absolute',
//     bottom: 0,
//   },
//   textStyle: {
//     alignSelf: 'center',
//     ...FONTS.appFontSemiBold,
//     marginVertical: 15,
//     color: COLORS.pureWhite,
//     fontWeight: 'bold',
//   },
//   errorStyle: {
//     ...FONTS.appFontSemiBold,
//     color: COLORS.red,
//     textAlign: 'center',
//   },
// });
export default AddExternalProduct;
