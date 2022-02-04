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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EditClientAgreement = ({navigation, route}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [newData, setNewData] = useState([]);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [upload, setUpload] = useState('');
  const [data, setData] = useState({});

  console.log('valuess', route.params.newData.id);

  useEffect(() => {
    getResource();
    setData(route.params.newData);
    setId(route.params.newData.client.id);

    setStartDate(route.params.newData.start_date);
    setEndDate(route.params.newData.end_date);
    setTitle(route.params.newData.title);
    setDescription(route.params.newData.description);
    setUpload(route.params.newData.pdf_file);
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
        'http://newresourcing.nimapinfotech.com/api/client-agreement',
        requestOptions,
      );

      //  console.log(data.data.data.clientAgreements);

      setNewData(data.data.data.clientAgreements);
    } catch (error) {
      console.log(error);
    }
  };

  //put
  const putUser = async () => {
    const store = {
      client_id: id,
      start_date: startDate,
      end_date: endDate,
      title: title,
      description: description,
      pdf_file: upload,
    };
    console.log('check------------->>>>', store);

    try {
      const token = await AsyncStorage.getItem('token');

      const requestOptions = {
        method: 'PUT',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        headers: {Authorization: 'Bearer ' + token},
      };

      const {data} = await axios.put(
        `http://newresourcing.nimapinfotech.com/api/client-agreement/${id}`,
        store,
        requestOptions,
      );
      setData(route.params.newData);

      if (data.message) {
        ToastAndroid.showWithGravity(
          ' Client Agreement Edited successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
      navigation.goBack();
    } catch (err) {
      // console.log(err.response)
      ToastAndroid.showWithGravity(
        'Client Agreement not Edited',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  const clientsOptions = newData.filter(t => t.client !== null);

  return (
    <SafeAreaView style={GLOBALSTYLES.mainContainer}>
      <CustomNavigationBar back={true} headername="Edit Client Agreement" />
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
            mode="dropdown"
            onValueChange={value => setId(value)}>
            <Picker.Item label=" Client Name" value="" />
            {clientsOptions.map((item, index) => (
              <Picker.Item
                key={item.client.id}
                label={item.client.client_name}
                value={item.client.id}
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
                // marginEnd: 50,
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
                // marginEnd: 50,
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
        </TouchableOpacity>

        <View style={GLOBALSTYLES.textInputView}>
          <TextInput
            placeholder="Title"
            style={GLOBALSTYLES.textInput}
            value={title}
            onChangeText={data => setTitle(data)}
          />
        </View>
        <View style={GLOBALSTYLES.textInputView}>
          <TextInput
            placeholder="Description"
            style={GLOBALSTYLES.textInput}
            value={description}
            onChangeText={data => setDescription(data)}
          />
        </View>

        <View style={GLOBALSTYLES.textInputView}>
          <TextInput
            placeholder="Upload"
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
            bottom: 0,
            position: 'absolute',
          }}
          onPress={() => putUser()}>
          <Text style={GLOBALSTYLES.textStyle}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditClientAgreement;
