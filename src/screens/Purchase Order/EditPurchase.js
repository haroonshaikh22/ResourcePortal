import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import CustomNavigationBar from '../../components/CustomNavigationBar';
import {COLORS, GLOBALSTYLES, FONTS} from '../../constants/theme';
import {Picker} from '@react-native-picker/picker';
import {URL} from '../../constants/configure';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-datepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const EditPurchaseOrder = ({navigation, route}) => {
  const [newData, setNewData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [id, setId] = useState('');
  const [order, setOrder] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pdf, setPdf] = useState('');
  const [data, setData] = useState({});


  console.log('valuess', route.params.newData.id);
  useEffect(() => {
    getResource();

    setData(route.params.newData);
    setOrder(route.params.newData.order_number);
    setTitle(route.params.newData.title);
    setDescription(route.params.newData.description);
    setPdf(route.params.newData.pdf_file);
    setId(route.params.newData.id);
    setStartDate(route.params.newData.start_date);
    setEndDate(route.params.newData.end_date);

    // setName(route.params.newData);
  }, []);
  console.log('get----------', route.params.newData);

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
        URL.PURCHASEORDERMASTERGET_URL,
        requestOptions,
      );

      console.log(data.data.data.purchase);

      setNewData(data.data.data.purchase);
     
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
      pdf_file: pdf,
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
        `http://newresourcing.nimapinfotech.com/api/purchase/${id}`,
        store,
        requestOptions,
      );
      setData(route.params.newData);
      if (data.message) {
        ToastAndroid.showWithGravity(
          'Purchase order Edited successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
      navigation.goBack();

    } catch (err) {
      console.log(err.response);
      ToastAndroid.showWithGravity(
        'Purchase order not Edited',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
      // console.log('check-------------->', data);
   
  };

  const clientsOptions = newData.filter(t => t.clients !== null);

  return (
    <SafeAreaView style={GLOBALSTYLES.mainContainer}>
      <CustomNavigationBar back={true} headername="Add Purchase Order" />

      <View style={{  width: wp('90%'),
            height: hp('7%'),
            margin: 5,
            marginStart: 20,
            backgroundColor: COLORS.pureWhite,
            borderRadius: 10,
            marginTop: 10,}}>
        <Picker
          selectedValue={id}
          style={{margin: 5}}
          onValueChange={value => setId(value)}
          mode="dropdown">
          <Picker.Item label="Select Client" value="" />
          {clientsOptions.map((item, index) => (
            <Picker.Item
              key={item.clients.id}
              label={item.clients.client_name}
              value={item.clients.id}
            />
          ))}
        </Picker>
      </View>

      <View style={GLOBALSTYLES.textInputView}>
        <TextInput
          placeholder="Purchase Order Number*"
          style={GLOBALSTYLES.textInput}
          value={order}
          onChangeText={data => setOrder(data)}
        />
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
          date={startDate}
          style={{width: '100%', top: 7}}

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
          date={endDate}
          style={{width: '100%', top: 7}}
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
          value={pdf}
          onChangeText={data => setPdf(data)}
        />
      </View>

      <TouchableOpacity
        style={GLOBALSTYLES.buttonStyle}
        onPress={() => putUser()}>
        <Text style={GLOBALSTYLES.textStyle}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditPurchaseOrder;
