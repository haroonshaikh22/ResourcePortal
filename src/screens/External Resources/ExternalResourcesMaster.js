import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native';
import SearchBox from '../../components/SearchBox';
import {COLORS, GLOBALSTYLES} from '../../constants/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL} from '../../constants/configure';
const ExternalResourcesMaster = ({navigation}) => {
 const [newData, setNewData] = useState([]);
  const [loding, setLoding] = useState(true);
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    getResource();
    getAccountFilterData();
  }, [search, loding]);

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
        'http://newresourcing.nimapinfotech.com/api/external-resource/external-resource',
        requestOptions,
      );

      console.log(data.data.data.data);
      setNewData(data.data.data.data);
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
          data.phone.toLowerCase().includes(search.toLowerCase()) ||
          data.fname.toLowerCase().includes(search.toLowerCase()) ||
          data.lname.toLowerCase().includes(search.toLowerCase()) ||
          data.email.toLowerCase().includes(search.toLowerCase()) ||
         (!!data.resident_address && data.resident_address.toLowerCase().includes(search.toLowerCase()))
        ) {
          console.log(data);
          return data;
        }
      });
      setFilterData(filterValue);
    }
  };
   //Delete User
   const deleteUser = async values => {
    console.log('check__', values);
    try {
      const token = await AsyncStorage.getItem('token');
      const requestOptions = {
        method: 'DELETE',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        headers: {Authorization: 'Bearer ' + token},
      };
      const {data} = await axios.delete(
        `http://newresourcing.nimapinfotech.com/api/external-resource/external-resource/${values}`,
        // values,
        requestOptions,
      );
      console.log(data);
      setSearch('');
      const remaningData = newData.filter(t => t.id !== values);
      setFilterData([...remaningData]);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleDelete = item => {
    console.log('Delte hit', deleteUser(item.id));
    // deleteUser(item.id);
    getResource();
    console.log('check id', item.id);
  };
  // const pdfView = () => {
  //   getResource();
  //   console.log(data.data.data.externalResource.resume);
  // }
  const displayModal = () => {
    setIsVisible(isVisible);
  }
  return (
    <SafeAreaView style={GLOBALSTYLES.mainContainer}>
      <SearchBox search={search} setSearchValue={setSearchValue} />

      {loding ? (
       <ActivityIndicator animating={true} size="large" style={{opacity:1,position: 'absolute',
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
              <Text style={GLOBALSTYLES.lebal}> Name</Text>
              <View style={GLOBALSTYLES.contentView}>
                <Text style={GLOBALSTYLES.content}>
                  {item.fname === null
                    ? '-'
                    : item.fname}
                </Text>
              </View>
            </View>
            <View style={GLOBALSTYLES.lebalView}>
              <Text style={GLOBALSTYLES.lebal}> Address</Text>
              <View style={GLOBALSTYLES.contentView}>
                <Text style={GLOBALSTYLES.content}>
                  {item.resident_address === null
                    ? '-'
                    : item.resident_address}
                </Text>
              </View>
            </View>
            
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}>Email Id</Text>

                <Text style={GLOBALSTYLES.content}>
                  {item.email === null ? '-' : item.email}
                </Text>
              </View>
              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}>Mobile</Text>

                <Text style={GLOBALSTYLES.content}>
                  {item.phone === null ? '-' : item.phone}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}>Language</Text>
                  <Text style={GLOBALSTYLES.content}>
                   {item.languages === null ? '-' : item?.languages[0]?.technology}
                  </Text>
              </View>
              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}>CV</Text>
                <TouchableOpacity>
                  <Text style={GLOBALSTYLES.content}>
                  View
                  </Text>
                  </TouchableOpacity>
              </View>

             </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}>Vendor</Text>

                <Text style={GLOBALSTYLES.content}>
                  {item.vendor === null ? '-' : item?.vendor.company_name}
                </Text>
              </View>
              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}>Cost</Text>

                <Text style={GLOBALSTYLES.content}>
                  {item.cost == null ? '-' : item.cost}
                </Text>
              </View>
            </View>
            <View style={GLOBALSTYLES.lebalView}>
              <Text style={GLOBALSTYLES.lebal}> L1</Text>
              <View style={GLOBALSTYLES.contentView}>
                <Text style={GLOBALSTYLES.content}>
                  {item.l1 === null
                    ? '-'
                    : item.l1}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', margin: 10}}>
                <TouchableOpacity style={GLOBALSTYLES.editBtn}
                                onPress={()=> navigation.navigate('Edit External Resource', {newData: item})}>
                                
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

export default ExternalResourcesMaster;
