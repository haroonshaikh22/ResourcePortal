import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import SearchBox from '../../components/SearchBox';
import {COLORS, GLOBALSTYLES} from '../../constants/theme';
import axios from 'axios';
import {URL} from '../../constants/configure';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExternalProductMaster = ({navigation}) => {
  const [newData, setNewData] = useState([]);
  const [loding, setLoding] = useState(true);
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    getResource();

    getAccountFilterData();
  }, [newData, search, loding]);

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
      const data = await axios.get(URL.EXTERNALPRODUCTGET_URL, requestOptions);

      // console.log(data.data.data.product);
      setNewData(data.data.data.product);
      setLoding(false);
      // console.log('che---------')
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
          data.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
          data.url.toLowerCase().includes(search.toLocaleLowerCase())

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
        `http://newresourcing.nimapinfotech.com/api/external-products/${values}`,
        // values,
        requestOptions,
      );
      console.log(data);
      setSearch('');
      const remaningData = newData.filter(t => t.id !== values);
      setFilterData([...remaningData]);

      if (data.message) {
        ToastAndroid.showWithGravity(
          'externalProduct deleted successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    } catch (err) {
      ToastAndroid.showWithGravity(
        'externalProduct data not found',
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
      <SearchBox setSearchValue={setSearchValue} />

      {loding ? (
        <ActivityIndicator
          animating={true}
          size="large"
          style={{
            opacity: 1,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      ) : (
        <FlatList
          data={filterData}
          renderItem={({item}) => (
            <View style={GLOBALSTYLES.appContainer}>
              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}> Name</Text>
                <View style={GLOBALSTYLES.contentView}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      margin: 2,
                      marginStart: 6,
                    }}>
                    {item.name === null ? '-' : item.name}
                  </Text>
                </View>
              </View>
              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}> URL</Text>
                <View style={GLOBALSTYLES.contentView}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: COLORS.blue,
                      margin: 2,
                      marginStart: 6,
                    }}>
                    {item.url === null ? '-' : item.url}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', margin: 10}}>
                <TouchableOpacity
                  style={GLOBALSTYLES.editBtn}
                  onPress={() =>
                    navigation.navigate('Edit ExternalProduct', {newData: item})
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

export default ExternalProductMaster;
