import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {COLORS, GLOBALSTYLES} from '../../constants/theme';
import SearchBox from '../../components/SearchBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {URL} from '../../constants/configure';

const ProjectTarget = ({navigation}) => {
  const [newData, setNewData] = useState([]);
  const [loding, setLoding] = useState(true);
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState([]);
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
      const data = await axios.get(URL.PROJECTTARGETGET_URL, requestOptions);

       console.log('find------------------->',data.data.data.projectTarget[0]);
      setNewData(data.data.data.projectTarget);

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
          data.resources.fname.toLowerCase().includes(search.toLowerCase()) ||
          data.resources.lname.toLowerCase().includes(search.toLowerCase()) ||
          data.resources.language.toLowerCase().includes(search.toLowerCase()) ||
          data.resources.resident_address.includes(search.toLowerCase()) ||
          data.date.includes(search)
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
        `http://newresourcing.nimapinfotech.com/api/project-target/${values}`,
        // values,
        requestOptions,
      );
      // console.log(data);
      setSearch('');
      const remaningData = newData.filter(t => t.id !== values);
      setFilterData([...remaningData]);
      if (data.message) {
        ToastAndroid.showWithGravity(
          'Project Target deleted successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
      
    } catch (err) {
      // console.log(err.response)
      ToastAndroid.showWithGravity(
        'Project Target not deleted',
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
          // showsHorizontalScrollIndicator={true}
          // initialNumToRender={5}
          renderItem={({item}) => (
            <View style={GLOBALSTYLES.appContainer}>
              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}>Name</Text>
                <View style={GLOBALSTYLES.contentView}>
                  <Text style={GLOBALSTYLES.content}>
                    {item.resources === null ? '-' : item?.resources.fname}
                  </Text>
                </View>
              </View>
              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}>Address</Text>
                <View style={GLOBALSTYLES.contentView}>
                  <Text style={GLOBALSTYLES.content}>
                    {item.resources === null
                      ? '-'
                      : item?.resources.resident_address}
                  </Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={GLOBALSTYLES.lebalView}>
                  <Text style={GLOBALSTYLES.lebal}>Language</Text>

                  <Text style={GLOBALSTYLES.content}>
                    {item.resources === null ? '-' : item?.resources.language}
                  </Text>
                </View>
                <View
                  style={{
                    right: 40,
                    flexDirection: 'column',
                    // padding: 10,
                    margin: 10,
                  }}>
                  <Text style={GLOBALSTYLES.lebal}>Target Date</Text>

                  <Text style={GLOBALSTYLES.content}>
                    {item.date === null ? '-' : item.date}
                  </Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={GLOBALSTYLES.lebalView}>
                  <Text style={GLOBALSTYLES.lebal}>Resource Profile</Text>
                  <TouchableOpacity>
                    <Text style={{fontSize: 15, color: COLORS.blue, margin: 2}}>
                      View
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    right: 40,
                    flexDirection: 'column',
                    // padding: 10,
                    margin: 10,
                  }}>
                  <Text style={GLOBALSTYLES.lebal}>Client Name</Text>

                  <Text style={GLOBALSTYLES.content}>
                    {item.resource === null ? '-' : item?.resources.null}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', margin: 10}}>
                <TouchableOpacity
                  style={GLOBALSTYLES.editBtn}
                  onPress={() =>
                    navigation.navigate('Edit Project Target', {newData: item})
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
export default ProjectTarget;