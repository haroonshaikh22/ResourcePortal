import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';
import {GLOBALSTYLES,FONTS,COLORS} from '../../constants/theme';
import SearchBox from '../../components/SearchBox';
import {URL} from '../../constants/configure';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountMaster = ({navigation}) => {
  const [newData, setNewData] = useState([]);
  const [loding, setLoding] = useState(true);
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    getResource();

    getAccountFilterData();
  }, [search, loding,newData]);

  //Get
  // console.log('check', newData)
  const getResource = async () => {
    // setLoding(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const requestOptions = {
        method: 'GET',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        headers: {Authorization: 'Bearer ' + token},
      };
      // console.log(requestOptions);
      const data = await axios.get(URL.BASE_URL+"/account", requestOptions);
      // console.log(data.data.data.accounts);
      setNewData(data.data.data.accounts);
      setLoding(false);
    } catch (error) {
      // console.log(error);
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
          data.name.toLowerCase().includes(search.toLowerCase()) ||
          data.phone.toLowerCase().includes(search.toLowerCase()) ||
          data.email.toLowerCase().includes(search.toLowerCase())
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
        URL.BASE_URL + `/account/${values}`,
        // values,
        requestOptions,
      );
      // console.log('---------------------',data);
      setSearch('');
      const remaningData = newData.filter(t => t.id !== values);
      setFilterData([...remaningData]);
      if (data.message) {
            ToastAndroid.showWithGravity(
              'Accounts deleted successfully',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          }
        } catch (err) {
          console.log(err.response)
          ToastAndroid.showWithGravity(
            'Accounts not deleted',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
  };

  const handleDelete = item => {
    // deleteUser(item.id);
    console.log('Delte hit', deleteUser(item.id));

    getResource();
    // console.log('check id', item.id);
  };

  return (
    <SafeAreaView style={GLOBALSTYLES.mainContainer}>
      <SearchBox setSearchValue={setSearchValue} />
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
                <Text style={GLOBALSTYLES.lebal}>Name</Text>
                <View style={GLOBALSTYLES.contentView}>
                  <Text style={GLOBALSTYLES.content}>
                    {item.name === null ? '-' : item.name}
                  </Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={GLOBALSTYLES.lebalView}>
                  <Text style={GLOBALSTYLES.lebal}>Email Id:</Text>

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

              <View style={{flexDirection: 'row', margin: 10}}>
                <TouchableOpacity style={GLOBALSTYLES.editBtn}
                onPress={()=> navigation.navigate('Edit Screen', {newData: item})}>
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

export default AccountMaster;
