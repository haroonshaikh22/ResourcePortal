import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import CustomNavigationBar from '../../components/CustomNavigationBar';
import {FONTS, COLORS} from '../../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Formik} from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditScreen = ({route, navigation}) => {
  const [data, setData] = useState({});
  const [name, setName] = useState('');

  console.log('valuess', route.params.newData.id);
  useEffect(() => {
    setData(route.params.newData);
    setName(route.params.newData);
  }, []);
  console.log('sadsd---------', route.params.newData);
  const loginValidationSchema = yup.object().shape({
    name: yup.string(),
    phone: yup.string(),
    email: yup.string(),
  });

  // console.warn('Routes: ', data.email)

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
        `http://newresourcing.nimapinfotech.com/api/account/${id}`,
        values,
        requestOptions,
      );

      // console.log(data);
      setData(route.params.newData);
      if (data.message) {
        ToastAndroid.showWithGravity(
          'Accounts Edited successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
      navigation.goBack();
    } catch (err) {
      console.log(err.response);
      ToastAndroid.showWithGravity(
        'Accounts not Edited',
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
    <SafeAreaView style={styles.mainContainer}>
      <CustomNavigationBar back={true} headername="Edit Accountant" />
      <View style={styles.container}>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            name: data.name,
            phone: data.phone,
            email: data.email,
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
              <View style={{height:hp('80%')}}>
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
                  value={values.name}
                  style={styles.textInput}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  keyboardType="default"
                />
              </View>
              {errors.name && touched.name && (
                <Text style={styles.errorStyle}>{errors.name}</Text>
              )}
              <View style={styles.textInputView}>
                <View style={styles.innerBtn}>
                  <FontAwesome
                    name="phone"
                    color={COLORS.lightBlue}
                    size={30}
                    style={styles.iconStyle}
                  />
                </View>
                <TextInput
                  placeholder="Mobile*"
                  value={values.phone}
                  style={styles.textInput}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  keyboardType="phone-pad"
                />
              </View>
              {errors.phone && touched.phone && (
                <Text style={styles.errorStyle}>{errors.phone}</Text>
              )}
              <View style={styles.textInputView}>
                <View style={styles.innerBtn}>
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={25}
                    color={COLORS.lightBlue}
                    style={styles.iconStyle}
                  />
                </View>
                <TextInput
                  placeholder="Email Id*"
                  value={values.email}
                  style={styles.textInput}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  keyboardType="email-address"
                />
              </View>
              {errors.email && touched.email && (
                <Text style={styles.errorStyle}>{errors.email}</Text>
              )}
              </View>
              
   <View style ={{ flex:1,flexDirection:'column',justifyContent:'space-between'}}>

              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  handleSubmit();
                }}>
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

export default EditScreen;
