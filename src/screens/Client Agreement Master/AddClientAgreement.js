import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import CustomNavigationBar from '../../components/CustomNavigationBar';
import {COLORS, FONTS, GLOBALSTYLES} from '../../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import DatePicker from 'react-native-datepicker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
const AddClientAgreement = ({navigation}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [newData, setNewData] = useState([]);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [drive, setDrive] = useState('');
  const [upload, setUpload] = useState('');

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
        'http://newresourcing.nimapinfotech.com/api/client',
        requestOptions,
      );

      //  console.log(data.data.data.clientAgreements);

      setNewData(data.data.data.clients);
    } catch (error) {
      console.log(error);
    }
  };

  const postUser = async () => {
    const store = {
      client_id: id,
      start_date: startDate,
      end_date: endDate,
      title: title,
      description: description,
      pdf_file: upload,
    };

    // console.log('checkv--------', store);
    try {
      const token = await AsyncStorage.getItem('token');

      const requestOptions = {
        method: 'POST',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        headers: {Authorization: 'Bearer ' + token},
      };

      const {data} = await axios.post(
        'http://newresourcing.nimapinfotech.com/api/client-agreement',
        store,
        requestOptions,
      );

      // console.log('valuecheck------------->',data);
      if (data.message) {
        ToastAndroid.showWithGravity(
          ' Client Agreement added successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
      navigation.goBack();
    } catch (err) {
      // console.log(err.response)
      ToastAndroid.showWithGravity(
        'Client Agreement not Added',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  const clientsOptions = newData.filter(t => t.client_name !== null);

  return (
    <SafeAreaView style={GLOBALSTYLES.mainContainer}>
      <CustomNavigationBar back={true} headername="Add Client Agreement" />
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
            style={{margin: 4,bottom:5}}
            mode="dropdown"
            onValueChange={value => setId(value)}>
            <Picker.Item label=" Client Name" value="" color='grey'/>
            {clientsOptions.map((item, index) => (
              <Picker.Item
                key={item.id}
                label={item.client_name}
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
            style={{width: "100%",top:7 }}
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

        <View
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
               style={{width: "100%",top:7 }}
            date={endDate}
            value={endDate}
            mode="date"
            placeholder="End Date"
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
            onDateChange={endDate => {
              setEndDate(endDate);
            }}
          />
          <FontAwesome
            name="calendar-o"
            size={20}
            style={{alignSelf: 'center', right: 30}}
          />
        </View>

        <View style={GLOBALSTYLES.textInputView}>
          <TextInput
            placeholder="Title"
            style={GLOBALSTYLES.textInput}
            value={title}
            onChangeText={data => setTitle(data)}
          />
        </View>
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
            value={description}
            onChangeText={data => setDescription(data)}
          />
        </View>

        <View style={GLOBALSTYLES.textInputView}>
          <TextInput
            placeholder="Upload PDF"
            style={GLOBALSTYLES.textInput}
            value={upload}
            onChangeText={data => setUpload(data)}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.skyBlue,
            width: wp('90%'),
            borderRadius: 10,
            alignSelf: 'center',
            bottom: 10,
            position: 'absolute',
          }}
          onPress={() => postUser()}>
          <Text style={GLOBALSTYLES.textStyle}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default AddClientAgreement;
