import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Button,
  Linking,
  ActivityIndicator,
} from 'react-native';
import SearchBox from '../../components/SearchBox';
import {COLORS, GLOBALSTYLES, FONTS} from '../../constants/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {URL} from '../../constants/configure';

const ClientMaster = ({navigation}) => {
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
      const data = await axios.get(
        'http://newresourcing.nimapinfotech.com/api/client',
        requestOptions,
      );

      console.log(data.data.data.clients);
      setNewData(data.data.data.clients);
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
          (data.title &&
            data.title.toLowerCase().includes(search.toLowerCase())) ||
          (data.clients?.client_name &&
            data.clients?.client_name
              .toLowerCase()
              .includes(!!search && search.toLowerCase())) ||
          (data.order_number &&
            data.order_number.toLowerCase().includes(search.toLowerCase())) ||
          (data.description &&
            data.description.toLowerCase().includes(search.toLowerCase())) ||
          data.start_date.includes(search) ||
          data.end_date.includes(search)
        ) {
          console.log(data);
          return data;
        }
      });
      setFilterData(filterValue);
    }
  };

  return (
    <SafeAreaView style={GLOBALSTYLES.mainContainer}>
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
                <Text style={GLOBALSTYLES.lebal}>Client Name</Text>
                <View style={GLOBALSTYLES.contentView}>
                  <Text style={GLOBALSTYLES.content}>
                    {item.client_name === null ? '-' : item.client_name}
                  </Text>
                </View>
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={GLOBALSTYLES.lebalView}>
                  <Text style={GLOBALSTYLES.lebal}>TS</Text>

                  <Text style={GLOBALSTYLES.content}>
                    {item.need_timesheet === null ? '-' : item.need_timesheet}
                  </Text>
                </View>
                <View
                  style={{
                    ...FONTS.appFontSemiBold,
                    color: 'black',
                    margin: 10,
                    right: 60,
                  }}>
                  <Text style={GLOBALSTYLES.lebal}>HC</Text>
                  <Text style={GLOBALSTYLES.content}>
                    {item.aggrement_sign === null ? '-' : item.aggrement_sign}
                  </Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={GLOBALSTYLES.lebalView}>
                  <Text style={GLOBALSTYLES.lebal}>WKD</Text>

                  <Text style={GLOBALSTYLES.content}>
                    {item.holidays === null ? '-' : item.holidays}
                  </Text>
                </View>
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={GLOBALSTYLES.lebalView}>
                  <Text style={GLOBALSTYLES.lebal}>DOI</Text>

                  <Text style={GLOBALSTYLES.content}>
                    {item.invoice_date === null ? '-' : item.invoice_date}
                  </Text>
                </View>
                <View style={GLOBALSTYLES.lebalView}>
                  <Text style={GLOBALSTYLES.lebal}>CD</Text>
                  <View style={GLOBALSTYLES.contentView}>
                    <Text style={GLOBALSTYLES.content}>
                      {item.credit_period === null ? '-' : item.credit_period}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}>Accountant Name</Text>
                <View style={GLOBALSTYLES.contentView}>
                  <Text style={GLOBALSTYLES.content}>
                    {item.account_name === null ? '-' : item.account_name}
                  </Text>
                </View>
              </View>
              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}>Accountant Email</Text>
                <View style={GLOBALSTYLES.contentView}>
                  <Text style={GLOBALSTYLES.content}>
                    {item.account_email === null ? '-' : item.account_email}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Edit Purchase Order', {newData: item})
                }
                style={{
                  backgroundColor: COLORS.skyBlue,
                  width: wp('80%'),
                  height: hp('7%'),
                  borderRadius: 10,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    ...FONTS.appFontSemiBold,
                    marginVertical: 15,
                    color: COLORS.pureWhite,
                    fontWeight: 'bold',
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default ClientMaster;
