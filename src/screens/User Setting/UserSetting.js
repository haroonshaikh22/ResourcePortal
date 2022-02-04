import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';
import {GLOBALSTYLES, COLORS, FONTS} from '../../constants/theme';
import SearchBox from '../../components/SearchBox';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL} from '../../constants/configure';
const UserSetting = ({navigation}) => {
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
      const data = await axios.get(URL.USERSETTINGGET_URL, requestOptions);

      // console.log(data.data.data.technologies);
      setNewData(data.data.data.users);
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
          data.name.toLowerCase().includes(search.toLowerCase()) ||
          data.email.toLowerCase().includes(search.toLowerCase()) ||
          data.type.toLowerCase().includes(search.toLowerCase())        ) {
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
        `http://newresourcing.nimapinfotech.com/api/user/${values}`,
        // values,
        requestOptions,
      );
      console.log(data);
      setSearch('');
      const remaningData = newData.filter(t => t.id !== values);
      setFilterData([...remaningData]);
      if (data.message) {
        ToastAndroid.showWithGravity(
          'User Deleted successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    } catch (err) {
      ToastAndroid.showWithGravity(
        'User not Deleted',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  
   
  };
  
  const handleDelete = item => {
    console.log('Delte hit', deleteUser(item.id));
    // deleteUser(item.id);
    getResource();
    console.log('check id', item.id);
  };

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
                <Text style={GLOBALSTYLES.lebal}>Name</Text>
                <View style={GLOBALSTYLES.contentView}>
                  <Text style={GLOBALSTYLES.content}>
                    {item.name === null ? '-' : item.name}
                  </Text>
                </View>
              </View>
              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}>Email Id</Text>
                <View style={GLOBALSTYLES.contentView}>
                  <Text style={GLOBALSTYLES.content}>
                  {item.email === null ? '-' : item.email}
                  </Text>
                </View>
              </View>
              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}>Login Type</Text>
                <View style={GLOBALSTYLES.contentView}>
                  <Text style={GLOBALSTYLES.content}>
                  {item.type === null ? '-' : item.type}
                  </Text>
                </View>
              </View>
              
              <View style={{flexDirection: 'row', margin: 10}}>
                <TouchableOpacity style={GLOBALSTYLES.editBtn}
                 onPress={() =>
                  navigation.navigate('Edit UserSetting', {newData: item})
                }>
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

export default UserSetting;
