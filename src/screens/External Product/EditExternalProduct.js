import React, {useState,useEffect} from 'react';
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
import {widthPercentageToDP as wp ,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import CustomNavigationBar from '../../components/CustomNavigationBar';
import {COLORS,FONTS, GLOBALSTYLES} from '../../constants/theme';
import {Formik} from 'formik';
import {URL} from '../../constants/configure';
import axios from 'axios';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditExternalProduct = ({route,navigation}) => {
    const [data, setData] = useState({});
    const [name, setName] = useState('');
    console.log('valuess', route.params.newData.id);
    useEffect(() => {
      setData(route.params.newData);
      setName(route.params.newData);
    }, []);

  const loginValidationSchema = yup.object().shape({
    name: yup.string().required('Please fill out this filed'),
    url: yup.string().required('Please fill out this filed'),
    description: yup.string().required('Please fill out this filed'),
  });
//put
const putUser = async values => {
    // console.log(values);
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
        `http://newresourcing.nimapinfotech.com/api/external-products/${id}`,
        values,
        requestOptions,
      );
       // console.log(data);
      setData(route.params.newData);
      setName(route.params.newData);

      if (data.status) {
        ToastAndroid.showWithGravity(
          'External Product Edited Successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
    navigation.goBack()
      }
    } catch (err) {
      ToastAndroid.showWithGravity(
        'externalProduct not Edited',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };
  const handleSubmit = values => {
    putUser(values);
    // console.log('values------->', values);
  };

  return (
    <SafeAreaView style={GLOBALSTYLES.mainContainer}>
      <CustomNavigationBar back={true} headername="Edit External Project" />
        <View style={GLOBALSTYLES.container}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{name: data.name, url: data.url, description:data.description}}
            enableReinitialize = {true}
            onSubmit={values => {
              handleSubmit(values);
            }}>
            {({handleChange, handleBlur, handleSubmit, errors, touched,values}) => (
              <>
              <View style={{height:hp('80%')}}>

                <View style={{  width: wp('90%'),
                  height: hp('7%'),
                  margin: 5,
                  flexDirection: 'row',
                  backgroundColor: COLORS.pureWhite,
                  marginStart: 20,
                  borderRadius: 10,
                  marginTop: 10,}}>
                  <TextInput
                    placeholder="Name*"
                    value={values.name}
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
                    value={values.url}
                    style={GLOBALSTYLES.textInput}
                    onChangeText={handleChange('url')}
                    onBlur={handleBlur('url')}
                  />
                </View>
                {errors.url && touched.url && (
                  <Text style={GLOBALSTYLES.errorStyle}>{errors.url}</Text>
                )}

                <View style={GLOBALSTYLES.textInputView}>
                  <TextInput
                    placeholder="Description"
                    value={values.description}
                    style={GLOBALSTYLES.textInput}
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                  />
                </View>
                {errors.description && touched.description && (
                  <Text style={GLOBALSTYLES.errorStyle}>
                    {errors.description}
                  </Text>
                )}
                </View>
<View style ={{ flex:1,flexDirection:'column',justifyContent:'space-between'}}>
                <TouchableOpacity
                  style={GLOBALSTYLES.buttonStyle}
                  onPress={() => {handleSubmit()}}>  
                  <Text style={GLOBALSTYLES.textStyle}>Submit</Text>
                </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
    </SafeAreaView>
  );
};

export default EditExternalProduct;
