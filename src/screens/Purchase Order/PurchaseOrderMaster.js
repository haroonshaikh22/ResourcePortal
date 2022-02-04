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

const PurchaseOrderMaster = ({navigation}) => {
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
        'http://newresourcing.nimapinfotech.com/api/purchase',
        requestOptions,
      );

      // console.log(data.data.data.purchase);
      setNewData(data.data.data.purchase);
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
          data.title && data.title.toLowerCase().includes(search.toLowerCase()) ||
            data.clients?.client_name && data.clients?.client_name.toLowerCase().includes(!!search && search.toLowerCase()) ||
            data.order_number && data.order_number.toLowerCase().includes(search.toLowerCase()) ||
            data.description && data.description.toLowerCase().includes(search.toLowerCase()) ||
           data.start_date.includes(search) ||
            data.end_date.includes(search) )
          {
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
                    {item.clients === null ? '-' : item?.clients.client_name}
                  </Text>
                </View>
              </View>
              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}>Title</Text>
                <View style={GLOBALSTYLES.contentView}>
                  <Text style={GLOBALSTYLES.content}>
                    {item.title === null ? '-' : item.title}
                  </Text>
                </View>
              </View>
              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}>Description</Text>
                <View style={GLOBALSTYLES.contentView}>
                  <Text style={GLOBALSTYLES.content}>
                    {item.description === null ? '-' : item.description}
                  </Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={GLOBALSTYLES.lebalView}>
                  <Text style={GLOBALSTYLES.lebal}>Order Number</Text>

                  <Text style={GLOBALSTYLES.content}>
                    {item.order_number === null ? '-' : item.order_number}
                  </Text>
                </View>
                <View
                  style={{
                    ...FONTS.appFontSemiBold,
                    color: 'black',
                    margin: 10,
                    right: 60,
                  }}>
                  <Text style={GLOBALSTYLES.lebal}>PDF</Text>

                  <Text
                    style={{
                      ...FONTS.appFontSemiBold,
                      color: COLORS.skyBlue,
                      marginStart: 3,
                    }}
                    onPress={() => {
                      Linking.openURL(
                        item.pdf_file === null ? '-' : item.pdf_file,
                      );
                    }}>
                    View
                  </Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={GLOBALSTYLES.lebalView}>
                  <Text style={GLOBALSTYLES.lebal}>Start Date</Text>

                  <Text style={GLOBALSTYLES.content}>
                    {item.start_date === null ? '-' : item.start_date}
                  </Text>
                </View>
                <View
                  style={{
                    ...FONTS.appFontSemiBold,
                    color: 'black',
                    margin: 10,
                    right: 15,
                  }}>
                  <Text style={GLOBALSTYLES.lebal}>End Date</Text>
                  <Text style={GLOBALSTYLES.content}>
                    {item.end_date === null ? '-' : item.end_date}
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

export default PurchaseOrderMaster;
