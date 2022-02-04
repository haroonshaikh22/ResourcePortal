import {StyleSheet, Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const {height, width} = Dimensions.get('window');

export const COLORS = {
  black: '#101011',
  lightBlack: '#777777',
  darkPink: '#F9485A',
  blue: '#4A68FF',
  lightBlue: '#91A3FF',
  orange: '#FEAD00',
  brown: '#FF6F00',
  lightPink: '#F38EB0',
  lightGrey: '#C4C4CF',
  navyBlue: '#14153F',
  grey: '#707070',
  white: '#EBEDF2',
  lightBlueC: '#67A0C0',
  red: '#FF0000',
  pureWhite: '#FFFFFF',
  green: '#58A158',
  skyBlue: '#87ceeb',
  whiteBlue: '#CCE5FF',
  lightGreen: '#78BE21',
};
export const FONTS = {
  appFontSemiBold: {fontFamily: 'Poppins-SemiBold.ttf', fontSize: 15},
  appFontSmallBold: {fontFamily: 'Poppins-SemiBold.ttf', fontSize: 12},
  appFontBold: {fontFamily: 'Poppins-SemiBold.ttf', fontSize: 20},
};
const nimaplogo = require('../../assets/images/nimap-logo.png');
export const IMAGES = {
  nimaplogo,
};
export const GLOBALSTYLES = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  appContainer: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    marginVertical: '1%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.pureWhite,
  },
  lebalView: {
    flexDirection: 'column',
    margin: 10,
  },
  lebal: {
    ...FONTS.appFontSemiBold,
    color: 'grey',
    padding: 2,
  },
  content: {
    ...FONTS.appFontSemiBold,
    color: 'black',
    margin: 2,
    marginStart: 3,
  },
  editBtn: {
    backgroundColor: COLORS.skyBlue,
    padding: 15,
    flex: 1,
    borderRadius: 10,
    margin: 10,
    right: 15,
  },
  editText: {
    ...FONTS.appFontSemiBold,
    alignSelf: 'center',
    color: COLORS.pureWhite,
    fontWeight: 'bold',
  },
  deleteBtn: {
    backgroundColor: COLORS.darkPink,
    padding: 15,
    flex: 1,
    borderRadius: 10,
    margin: 10,
    left: 15,
  },
  deleteText: {
    ...FONTS.appFontSemiBold,
    alignSelf: 'center',
    color: COLORS.pureWhite,
    fontWeight: 'bold',
  },

  textInputView: {
    width: wp('90%'),
    height: hp('7%'),
    margin: 5,
    marginStart: 20,
    backgroundColor: COLORS.pureWhite,
    borderRadius: 10,
  },
  textInput: {
    width: wp('80%'),
    marginHorizontal: 20,
    ...FONTS.appFontSemiBold,
    marginTop:4
  },
  buttonStyle: {
    backgroundColor: COLORS.skyBlue,
    width: wp('90%'),
    height: hp('7%'),
    borderRadius: 10,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
  textStyle: {
    alignSelf: 'center',
    ...FONTS.appFontSemiBold,
    marginVertical: 15,
    color: COLORS.pureWhite,
    fontWeight: 'bold',
  },
  iconStyle: {
    alignSelf: 'center',
    marginEnd: 15,
  },
  errorStyle: {
    ...FONTS.appFontSemiBold,
    color: COLORS.red,
    textAlign: 'center',
  },
});
