import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import {GLOBALSTYLES, COLORS, FONTS} from '../../constants/theme';
import SearchBox from '../../components/SearchBox';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL} from '../../constants/configure';
const Vendor = ({navigation}) => {
  const [newData, setNewData] = useState([]);
  const [loding, setLoding] = useState(true);
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    getResource();
    getAccountFilterData();
  }, [search, loding,newData]);

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
      const data = await axios.get(URL.VENDORGET_URL, requestOptions);

      // console.log(data.data.data.technologies);
      setNewData(data.data.data.vendors);
      setLoding(false);
    } catch (error) {
      console.log(error);
      setLoding(true);
    }
  };

  const setSearchValue = value => {
    setSearch(value);
  };
  const getAccountFilterData = () => {
    if (!loding) {
      const filterValue = newData?.filter(data => {
        if (search.length === 0) {
          return data;
        } else if (
          data.company_name.toLowerCase().includes(search.toLowerCase()) ||
          data.contact_person.toLowerCase().includes(search.toLowerCase()) ||
          data.contact_number.toLowerCase().includes(search.toLowerCase()) ||
          data.contact_email.toLowerCase().includes(search.toLowerCase()) ||
          data.pan.toLowerCase().includes(search.toLowerCase()) ||
          data.gst.toLowerCase().includes(search.toLowerCase()) 

          ) {
          // console.log(data);
          return data;
        }
      });
      setFilterData(filterValue);
    }
  };

  //Delete User
  const deleteUser = async values => {
    // console.log('check__', values);
    try {
      const token = await AsyncStorage.getItem('token');
      const requestOptions = {
        method: 'DELETE',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        headers: {Authorization: 'Bearer ' + token},
      };
      const {data} = await axios.delete(
        `http://newresourcing.nimapinfotech.com/api/vendor/${values}`,
        // values,
        requestOptions,
      );
      // console.log(data);
      setSearch('');
      const remaningData = newData.filter(t => t.id !== values);
      setFilterData([...remaningData]);
      if (data.message) {
        ToastAndroid.showWithGravity(
          'Vendor Deleted successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }

    } catch (err) {
      console.log(err.response);
      ToastAndroid.showWithGravity(
        'Vendor not deleted',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  
  };
  
  const handleDelete = item => {
    console.log('Delte hit', deleteUser(item.id));
    // deleteUser(item.id);
    deleteUser();
    console.log('check id', item.id);
  };

  return (
    <SafeAreaView style={GLOBALSTYLES.mainContainer}>

      <SearchBox search={search} setSearchValue={setSearchValue} />
      {loding ? (
      <ActivityIndicator animating={true} size="large" style={{opacity:1, position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'}}  />  
      ) : (
        <FlatList
          data={filterData}
          renderItem={({item}) => (
            <View style={GLOBALSTYLES.appContainer}>
            <View style={GLOBALSTYLES.lebalView}>
              <Text style={GLOBALSTYLES.lebal}>Company Name</Text>
              <View style={GLOBALSTYLES.contentView}>
                <Text style={GLOBALSTYLES.content}>
                  {item.company_name === null ? '-' : item.company_name}
                </Text>
              </View>
            </View>
            <View style={GLOBALSTYLES.lebalView}>
              <Text style={GLOBALSTYLES.lebal}>Contact Person</Text>
              <View style={GLOBALSTYLES.contentView}>
                <Text style={GLOBALSTYLES.content}>
                  {item.contact_person === null ? '-' : item.contact_person}
                </Text>
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}>Email Id</Text>

                <Text style={GLOBALSTYLES.content}>
                  {item.contact_email === null ? '-' : item.contact_email}
                </Text>
              </View>
              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}>Mobile</Text>

                <Text style={GLOBALSTYLES.content}>
                  {item.contact_number === null ? '-' : item.contact_number}
                </Text>
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}>GST Number</Text>

                <Text style={GLOBALSTYLES.content}>
                  {item.gst === null ? '-' : item.gst}
                </Text>
              </View>
              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}>PAN Number</Text>

                <Text style={GLOBALSTYLES.content}>
                  {item.pan === null ? '-' : item.pan}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', margin: 10}}>
              <TouchableOpacity style={GLOBALSTYLES.editBtn}
                onPress={()=> navigation.navigate('Edit Vendor', {newData: item})}>
                              
                <Text style={GLOBALSTYLES.editText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={GLOBALSTYLES.deleteBtn}
                onPress={() => handleDelete(item)}>
                <Text style={GLOBALSTYLES.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      )}
    </SafeAreaView>
  );
};

export default Vendor;
