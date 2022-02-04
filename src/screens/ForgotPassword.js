import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {COLORS, FONTS,IMAGES} from '../constants/theme';
import axios from 'axios';

const ForgotPassword = ({navigation}) => {
  const postForgot = async () => {
    axios
      .post('http://newresourcing.nimapinfotech.com/api/auth/forgot-password', {
        email: 'test@nimapinfotech.com',
      })
      .then(response => console.log(response.data));
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <ScrollView style={{flex:1}}>
          <View style={styles.ImageView}>
            <Image source={IMAGES.nimaplogo} style={styles.ImageStyle} />
          </View>
          <View style={styles.loginContainer}>
            <View style={styles.textInputStyle}>
              <TextInput
                placeholder="email"
                style={styles.textInput}
                keyboardType="default"
                maxLength={40}
              />
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={postForgot}>
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.textStyle}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  ImageView: {
    marginTop: '25%',
  },
  ImageStyle: {
    alignSelf: 'center',
    margin: '10%',
  },
  loginContainer: {
    width: '99%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '6%',
    marginBottom: '20%',
    backgroundColor: COLORS.white,
  },
  textInputStyle: {
    padding: '2%',
    minWidth: '100%',
    margin: '3%',
    backgroundColor: COLORS.pureWhite,
    borderRadius: 10,
    ...FONTS.appFontSemiBold,
    marginBottom: '5%',
  },
  textInput: {
    ...FONTS.appFontSemiBold,
  },
  buttonStyle: {
    backgroundColor: COLORS.blue,
    padding: '3%',
    width: '100%',
    borderRadius: 10,
    marginTop: '13%',
  },
  textStyle: {
    alignSelf: 'center',
    ...FONTS.appFontSemiBold,
    marginVertical: '2%',
    color: COLORS.pureWhite,
    fontWeight: 'bold',
  },
})
export default ForgotPassword;
