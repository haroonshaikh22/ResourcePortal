import React, {useState, useEffect} from 'react';
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {COLORS, FONTS, GLOBALSTYLES} from '../../constants/theme';
import {Formik} from 'formik';
import {URL} from '../../constants/configure';
import axios from 'axios';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditTechnology = ({route, navigation}) => {
  const [data, setData] = useState({});
  const [name, setName] = useState('');
  useEffect(() => {
    setData(route.params.newData);
    setName(route.params.newData);
  }, []);

  const loginValidationSchema = yup.object().shape({
    technology: yup.string().required('Please fill out this filed'),
    url: yup.string().required('Please fill out this filed'),
  });
  //put
  const putUser = async values => {
    console.log(values);
    const id = route.params.newData.id;
    try {
      const token = await AsyncStorage.getItem('token');

      const requestOptions = {
        method: 'PUT',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        headers: {Authorization: 'Bearer ' + token},
      };

      const {data} = await axios.put(
        `http://newresourcing.nimapinfotech.com/api/technology/${id}`,
        values,
        requestOptions,
      );
      console.log(data);
      setData(route.params.newData);
      setName(route.params.newData);
      if (data.message) {
        ToastAndroid.showWithGravity(
          'Technology edited successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
      navigation.goBack();
    } catch (err) {
      console.log(err.response);
      ToastAndroid.showWithGravity(
        'Technology not edited',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };
  const handleSubmit = values => {
    putUser(values);
    // console.log('values-------', values);
  };

  return (
    <SafeAreaView style={GLOBALSTYLES.mainContainer}>
      <CustomNavigationBar back={true} headername="Edit Technology" />

      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{technology: data.technology, url: data.url}}
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
            <View
              style={{
                width: wp('90%'),
                height: hp('7%'),
                margin: 5,
                marginStart: 20,
                backgroundColor: COLORS.pureWhite,
                borderRadius: 10,
                marginTop: 10,
              }}>
              <TextInput
                placeholder="Name*"
                value={values.technology}
                style={GLOBALSTYLES.textInput}
                onChangeText={handleChange('technology')}
                onBlur={handleBlur('technology')}
              />
            </View>
            {errors.technology && touched.technology && (
              <Text style={GLOBALSTYLES.errorStyle}>{errors.technology}</Text>
            )}

            <View style={GLOBALSTYLES.textInputView}>
              <TextInput
                placeholder="URL"
                value={values.url}
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
              onPress={() => {
                handleSubmit();
              }}>
              <Text style={GLOBALSTYLES.textStyle}>Submit</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default EditTechnology;
