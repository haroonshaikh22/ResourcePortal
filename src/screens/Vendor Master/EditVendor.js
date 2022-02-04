import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import CustomNavigationBar from '../../components/CustomNavigationBar';
import {FONTS, COLORS, GLOBALSTYLES} from '../../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Formik} from 'formik';
import * as yup from 'yup';

const EditVendor = ({navigation, route}) => {

  const [newData, setNewData] = useState([]);
  const [data, setData] = useState({});

  console.log('values----------', route.params.newData.id);
  useEffect(() => {
    getResource();

    setData(route.params.newData);
  
  }, []);
  console.log('get----------', route.params.newData);

  //get
  const getResource = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const requestOptions = {
        method: 'GET',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        headers: {Authorization: 'Bearer ' + token},
      };
      // console.log(requestOptions);
      const data = await axios.get(
        'http://newresourcing.nimapinfotech.com/api/vendor',
        requestOptions,
      );

      // console.log(data.data.data.vendors);

      setNewData(data.data.data.vendors);
    } catch (error) {
      console.log(error);
    }
  };
  //put
  const putUser = async values => {
    console.log('mera---->', values)
    const id = route.params.newData.id;

    // const store = {
    //   company_name: company,
    // contact_person : person,
    // company_address : address,
    // contact_number : number,
    // contact_email : email,
    // pan: pan,
    // gst: gst,
    // gst_link : gstl,
    // pan_link : panl,
    // agreement_link : agreement,
    // };

    try {
      const token = await AsyncStorage.getItem('token');

      const requestOptions = {
        method: 'PUT',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        headers: {Authorization: 'Bearer ' + token},
      };
      console.log(requestOptions);
      const {data} = await axios.put(
        `http://newresourcing.nimapinfotech.com/api/vendor/${id}`,
        values,

        requestOptions,
      );
      setData(route.params.newData);

      // console.log('checks-------------->',route.params.newData.id );
      if (data.message) {
        ToastAndroid.showWithGravity(
          'Vendor Edited successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
      navigation.goBack();

    } catch (err) {
      console.log(err.response);
      ToastAndroid.showWithGravity(
        'Vendor not Edited',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };
  const loginValidationSchema = yup.object().shape({
    company_name: yup.string().required('These field is Required'),
    contact_person: yup.string().required('These field is Required'),
    company_address: yup.string().required('These field is Required'),
    contact_number: yup.string().required('These field is Required'),
    contact_email: yup.string().required('These field is Required'),
    gst_link: yup.string().required('These field is Required'),
    gst: yup.string().required('These field is Required'),
    pan: yup.string().required('These field is Required'),
    agreement_link: yup.string().required('These field is Required'),
    pan_link: yup.string().required('These field is Required'),

  });

  const handleSubmit = values => {
    putUser(values);
    // console.log('values-------', values);
  };
  // const clientsOptions = newData.filter(t => t.company_name !== null);

  return (
    <SafeAreaView style={GLOBALSTYLES.mainContainer}>
      <CustomNavigationBar back={true} headername="Edit Vendor" />
      <ScrollView>
      <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            company_name: data.company_name,
            contact_person : data.contact_person,
            company_address: data.company_address,
            contact_number: data. contact_number,
            contact_email : data.contact_email,
            gst_link: data.gst_link,
            gst: data.gst,
            pan : data.pan,
            agreement_link: data.agreement_link,
            pan_link : data. pan_link,
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
        <View style={{height: hp('95%')}}>
       
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
              placeholder="Company Name"
              style={GLOBALSTYLES.textInput}
              value={values.company_name}
              onChangeText={handleChange('company_name')}
                  onBlur={handleBlur('company_name')}
                  keyboardType='default'
            />
           
          </View>
          {errors.company_name && touched.company_name && (
                <Text style={GLOBALSTYLES.errorStyle}>{errors.company_name}</Text>
              )}
          <View style={GLOBALSTYLES.textInputView}>
            <TextInput
              placeholder="Contact Person*"
              style={GLOBALSTYLES.textInput}
              value={values.contact_person}
              onChangeText={handleChange('contact_person')}
              onBlur={handleBlur('contact_person')}
              keyboardType='default'
            />
          </View>
          {errors.contact_person && touched.contact_person && (
                <Text style={GLOBALSTYLES.errorStyle}>{errors.contact_person}</Text>
              )}
          <View
            style={{
              width: wp('90%'),
              height: hp('7%'),
              margin: 5,
              marginStart: 20,
              backgroundColor: COLORS.pureWhite,
              flexDirection: 'row',

              borderRadius: 10,
            }}>
            <View
              style={{
                justifyContent: 'center',
                borderRadius: 10,
                padding: 5,

                backgroundColor: COLORS.whiteBlue,
              }}>
              <FontAwesome
                color={COLORS.lightBlue}
                name="phone"
                size={30}
                style={{right: 10, marginStart: 20}}
              />
            </View>
            <TextInput
              placeholder="Mobile*"
              style={GLOBALSTYLES.textInput}
              value={values.contact_number}
              onChangeText={handleChange('contact_number')}
              onBlur={handleBlur('contact_number')}
              keyboardType='phone-pad'
            />
          </View>
          {errors.contact_number && touched.contact_number && (
                <Text style={GLOBALSTYLES.errorStyle}>{errors.contact_number}</Text>
              )}
          <View
            style={{
              width: wp('90%'),
              height: hp('7%'),
              margin: 5,
              marginStart: 20,
              backgroundColor: COLORS.pureWhite,
              flexDirection: 'row',

              borderRadius: 10,
            }}>
            <View
              style={{
                justifyContent: 'center',
                borderRadius: 10,
                padding: 5,

                backgroundColor: COLORS.whiteBlue,
              }}>
              <MaterialCommunityIcons
                color={COLORS.lightBlue}
                name="email-outline"
                size={25}
                style={{right: 10, marginStart: 20}}
              />
            </View>
            <TextInput
              placeholder="Email Id*"
              style={GLOBALSTYLES.textInput}
              value={values.contact_email}
              onChangeText={handleChange('contact_email')}
              onBlur={handleBlur('contact_email')}
              keyboardType='email-address'
            />
          </View>
          {errors.contact_email && touched.contact_email && (
                <Text style={GLOBALSTYLES.errorStyle}>{errors.contact_email}</Text>
              )}

          <View style={GLOBALSTYLES.textInputView}>
            <TextInput
              placeholder="Company Address"
              style={GLOBALSTYLES.textInput}
              value={values.company_address}
              onChangeText={handleChange('company_address')}
              onBlur={handleBlur('company_address')}
              keyboardType='email-address'
            />
          </View>
          {errors.company_address && touched.company_address && (
                <Text style={GLOBALSTYLES.errorStyle}>{errors.company_address}</Text>
              )}

          <View style={GLOBALSTYLES.textInputView}>
            <TextInput
              placeholder="PAN Number"
              style={GLOBALSTYLES.textInput}
              value={values.pan}
              onChangeText={handleChange('pan')}
              onBlur={handleBlur('pan')}
              keyboardType='default'
            />
          </View>
          {errors.pan && touched.pan && (
                <Text style={GLOBALSTYLES.errorStyle}>{errors.pan}</Text>
              )}
          <View style={GLOBALSTYLES.textInputView}>
            <TextInput
              placeholder="Upload PAN"
              style={GLOBALSTYLES.textInput}
              value={values.pan_link}
              onChangeText={handleChange('pan_link')}
              onBlur={handleBlur('pan_link')}
              keyboardType='default'
            />
          </View>
          {errors.pan_link && touched.pan_link && (
                <Text style={GLOBALSTYLES.errorStyle}>{errors.pan_link}</Text>
              )}
          <View style={GLOBALSTYLES.textInputView}>
            <TextInput
              placeholder="GST Number"
              style={GLOBALSTYLES.textInput}
              value={values.gst}
              onChangeText={handleChange('gst')}
              onBlur={handleBlur('gst')}
              keyboardType='default'
            />
          </View>
          {errors.gst && touched.gst && (
                <Text style={GLOBALSTYLES.errorStyle}>{errors.gst}</Text>
              )}
          <View style={GLOBALSTYLES.textInputView}>
            <TextInput
              placeholder="Upload GST"
              style={GLOBALSTYLES.textInput}
              value={values.gst_link}
              onChangeText={handleChange('gst_link')}
              onBlur={handleBlur('gst_link')}
              keyboardType='default'
            />
          </View>
          {errors.gst_link && touched.gst_link && (
                <Text style={GLOBALSTYLES.errorStyle}>{errors.gst_link}</Text>
              )}
          <View style={GLOBALSTYLES.textInputView}>
            <TextInput
              placeholder="Agreement Attachment"
              style={GLOBALSTYLES.textInput}
              value={values.agreement_link}
              onChangeText={handleChange('agreement_link')}
              onBlur={handleBlur('agreement_link')}
              keyboardType='default'
            />
          </View>
          {errors.agreement_link && touched.agreement_link && (
                <Text style={GLOBALSTYLES.errorStyle}>{errors.agreement_link}</Text>
              )}
        </View>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <TouchableOpacity
            style={{
              width: wp('90%'),
              borderRadius: 10,
              alignSelf: 'center',
              bottom: 20,
              backgroundColor: COLORS.skyBlue,

              position: 'absolute',
            }}
            onPress={() => {
              handleSubmit();
            }}>

            <Text style={GLOBALSTYLES.textStyle}>Submit</Text>
          </TouchableOpacity>
        </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditVendor;