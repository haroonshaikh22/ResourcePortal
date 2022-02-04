import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import CustomNavigationBar from '../../components/CustomNavigationBar';
import {COLORS, FONTS, GLOBALSTYLES} from '../../constants/theme';
import {Picker} from '@react-native-picker/picker';
import {URL} from '../../constants/configure';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-datepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const AddProjectTarget = ({navigation}) => {
  const [id, setId] = useState('');
  const [newData, setNewData] = useState([]);
  const [startDate, setStartDate] = useState('');

  useEffect(() => {
    getResource();
  }, []);

  const getResource = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const requestOptions = {
        method: 'GET',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        headers: {Authorization: 'Bearer ' + token},
      };
      console.log(requestOptions);
      const data = await axios.get(
        'http://newresourcing.nimapinfotech.com/api/resource',
        requestOptions,
      );

      // console.log(data.data.data.projectTarget);

      setNewData(data.data.data.resources);
    } catch (error) {
      console.log(error);
    }
  };
  const postUser = async () => {
    const store = {
      resource: id,
      date: startDate,
    };
    console.log('check------------->>>>', store);

    try {
      const token = await AsyncStorage.getItem('token');

      const requestOptions = {
        method: 'POST',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        headers: {Authorization: 'Bearer ' + token},
      };

      const {data} = await axios.post(
        'http://newresourcing.nimapinfotech.com/api/project-target',
        store,
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
  // const handleSubmit = values => {
  //   postUser(values);
  // };
  const clientsOptions = newData.filter(t => t.fname !== null);
  return (
    <SafeAreaView style={GLOBALSTYLES.mainContainer}>
      <CustomNavigationBar back={true} headername="Add Project Target" />
      <View style={{height: hp('80%')}}>
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
          <Picker
            selectedValue={id}
            style={{margin: 4}}
            onValueChange={value => setId(value)}
            mode="dropdown">
            <Picker.Item label="Select Resource" value="" color='grey' />
            {clientsOptions.map((item, index) => (
              <Picker.Item
                key={item.id}
                label={item.fname}
                value={item.id}
              />
            ))}
          </Picker>
        </View>
        <TouchableOpacity
          style={{
            width: wp('90%'),
            height: hp('7%'),
            margin: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: COLORS.pureWhite,
            marginStart: 20,
            borderRadius: 10,
          }}>
          <DatePicker
            style={{width: '100%', top: 7}}
            date={startDate}
            value={startDate}
            mode="date"
            placeholder="Start Date"
            format="DD MMMM YYYY"
            minDate="01 01 2016"
            maxDate="01 01 2025"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={{
              dateInput: {
                borderWidth: 0,
                
                position: 'absolute',
                left: 20,
                ...FONTS.appFontSemiBold,

              },
            }}
            onDateChange={startDate => {
              setStartDate(startDate);
            }}
          />
          <FontAwesome
            name="calendar-o"
            size={20}
            style={{alignSelf: 'center', right: 30}}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={
            GLOBALSTYLES.buttonStyle}
          onPress={() => postUser()}>
          <Text style={GLOBALSTYLES.textStyle}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddProjectTarget;