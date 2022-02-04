import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {GLOBALSTYLES, COLORS, FONTS} from '../../constants/theme';
import SearchBox from '../../components/SearchBox';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL} from '../../constants/configure';
const TechnologyMaster = ({navigation}) => {
  const [newData, setNewData] = useState([]);
  const [loding, setLoding] = useState(true);
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    getResource();
    getAccountFilterData();
  }, [search, loding, newData]);

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
      console.log(requestOptions);
      const data = await axios.get(
        URL.BASE_URL + '/technology',
        requestOptions,
      );

      // console.log(data.data.data.technologies);
      setNewData(data.data.data.technologies);
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
          data.technology.toLowerCase().includes(search.toLowerCase()) ||
          data.url.toLowerCase().includes(search.toLowerCase()) 
          // data.count?.primary_resource.includes(!!search && search.toLowerCase()) ||
          // data.count?.secondary_resource.includes(!!search && search.toLowerCase()) 
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
        `http://newresourcing.nimapinfotech.com/api/technology/${values}`,
        // values,
        requestOptions,
      );
      console.log(data);
      setSearch('');
      const remaningData = newData.filter(t => t.id !== values);
      setFilterData([...remaningData]);
      if (data.message) {
        ToastAndroid.showWithGravity(
          'Technology deleted successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    } catch (err) {
      console.log(err.response);
      ToastAndroid.showWithGravity(
        'Technology not deleted',
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
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <SearchBox search={search} setSearchValue={setSearchValue} />
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
                <Text style={GLOBALSTYLES.lebal}>Technology</Text>
                <View style={GLOBALSTYLES.contentView}>
                  <Text
                    style={{
                      ...FONTS.appFontSemiBold,
                      color: 'black',
                      margin: 2,
                      marginStart: 5,
                    }}>
                    {item.technology === null ? '-' : item.technology}
                  </Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={GLOBALSTYLES.lebalView}>
                  <Text style={GLOBALSTYLES.lebal}>Primary Resources</Text>

                  <Text style={GLOBALSTYLES.content}>
                    {item.count?.primary_resource === null
                      ? '-'
                      : item?.count?.primary_resource}
                  </Text>
                </View>
                <View style={GLOBALSTYLES.lebalView}>
                  <Text style={GLOBALSTYLES.lebal}>Secondary Resources</Text>

                  <Text style={GLOBALSTYLES.content}>
                    {item.count?.secondary_resource === null
                      ? '-'
                      : item?.count?.secondary_resource}
                  </Text>
                </View>
              </View>

              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}>URL</Text>
                <View style={GLOBALSTYLES.contentView}>
                  <Text
                    style={{
                      color: COLORS.blue,
                      ...FONTS.appFontSemiBold,
                      margin: 2,
                      marginStart: 4,
                    }}>
                    {item.url === null ? '-' : item.url}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', margin: 10}}>
                <TouchableOpacity
                  style={GLOBALSTYLES.editBtn}
                  onPress={() =>
                    navigation.navigate('Edit Technology', {newData: item})
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

export default TechnologyMaster;
