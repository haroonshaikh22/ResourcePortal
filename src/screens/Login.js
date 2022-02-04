import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import {COLORS, IMAGES, FONTS} from '../constants/theme';
import {Formik} from 'formik';
import * as yup from 'yup';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL} from '../constants/configure';

const {height, width} = Dimensions.get('window');

const Login = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(true);
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Please fill out this filed'),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Please fill out this filed'),
  });
  const postUser = async values => {
    console.log(values)

    try {
      const {data} = await axios.post(URL.LOGINPOST_URL, values);

      console.log(data)
      if (data.message) {
        ToastAndroid.showWithGravity(
          'Login successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        await AsyncStorage.setItem('token', data.token);
        
      }
      navigation.navigate('HomeScreen');
    } catch (err) {
      ToastAndroid.showWithGravity(
        'Please check user email and password',
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
      <View style={styles.container}>
        <ScrollView style={styles.ScrollViewStyle}>
          <View style={styles.ImageView}>
            <Image source={IMAGES.nimaplogo} style={styles.ImageStyle} />
          </View>
          <View style={styles.loginContainer}>
            <Formik
              validationSchema={loginValidationSchema}
              initialValues={{email: '', password: ''}}
              onSubmit={handleSubmit}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                values,
                isValid,
                touched,
              }) => (
                <>
                  <View style={styles.textInputStyle}>
                    <TextInput
                      placeholder="User Name"
                      style={styles.textInput}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      keyboardType="default"
                      maxLength={40}
                    />
                  </View>
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}

                  <View style={styles.textInputStyle}>
                    <TextInput
                      placeholder="Password"
                      style={styles.textInput}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      secureTextEntry={visible}
                      maxLength={15}
                    />
                    <TouchableOpacity
                      style={styles.btnStyle}
                      onPress={() => {
                        setShow(!show);
                        setVisible(!visible);
                      }}>
                      <Entypo
                        name={show === true ? 'eye' : 'eye-with-line'}
                        size={26}
                        color={COLORS.grey}
                      />
                    </TouchableOpacity>
                  </View>

                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                    <Text style={styles.forgotStyle}>Forgot Password?</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={handleSubmit}
                    disabled={!isValid}>
                    <Text style={styles.textStyle}>Login</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
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
  ImageView: {
    width: width / 2,
    alignSelf: 'center',
    height: height / 3.5,
    justifyContent: 'center',
    marginVertical: 20,
  },
  ImageStyle: {
    alignSelf: 'center',
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    backgroundColor: COLORS.white,
  },
  textInputStyle: {
    padding: 6,
    width: width / 1.1,
    margin: 10,
    backgroundColor: COLORS.pureWhite,
    borderRadius: 10,
    ...FONTS.appFontSemiBold,
  },
  textInput: {
    ...FONTS.appFontSemiBold,
  },
  buttonStyle: {
    backgroundColor: COLORS.blue,
    padding: 20,
    width: width / 1.1,
    borderRadius: 10,
    marginTop: '15%',
  },
  textStyle: {
    alignSelf: 'center',
    ...FONTS.appFontSemiBold,
    color: COLORS.pureWhite,
    fontWeight: 'bold',
  },
  forgotStyle: {
    ...FONTS.appFontSemiBold,
    position: 'absolute',
    left: '14%',
  },
  errorText: {
    color: COLORS.red,
    textAlign: 'center',
  },
  btnStyle: {
    position: 'absolute',
    marginTop: '5%',
    right: '5%',
  },
});

export default Login;
