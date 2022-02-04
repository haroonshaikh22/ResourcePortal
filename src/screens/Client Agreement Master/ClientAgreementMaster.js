import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Linking,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS, GLOBALSTYLES} from '../../constants/theme';
import SearchBox from '../../components/SearchBox';

import axios from 'axios';
import {URL} from '../../constants/configure';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClientAgreementMaster = ({navigation}) => {
  const [newData, setNewData] = useState([]);
  const [loding, setLoding] = useState(true);
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState([]);


  useEffect(() => {
    getResource();
    getAccountFilterData();
  }, [search, loding, newData]);

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
        URL.BASE_URL + '/client-agreement',
        requestOptions,
      );
      // console.log(data.data.data.clientAgreements);
      setNewData(data.data.data.clientAgreements);
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
          data.title.toLowerCase().includes(search.toLowerCase()) ||
          data.client?.client_name.toLowerCase().includes(!!search && search.toLowerCase()) ||
          data.start_date.includes(search) ||
          data.end_date.includes(search))
          {
          // console.log(data);
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
            <View style={styles.appContainer}>
              <View style={styles.lebalView}>
                <Text
                  style={{
                    ...FONTS.appFontSemiBold,
                    color: 'grey',
                    padding: 2,
                    right: 4,
                  }}>
                  Client Name
                </Text>
                <View style={styles.contentView}>
                  <Text
                    style={{
                      ...FONTS.appFontSemiBold,
                      color: 'black',
                      margin: 2,
                      right: 8,
                    }}>
                    {item.client?.client_name === null
                      ? '-'
                      : item?.client?.client_name}
                  </Text>
                </View>
              </View>
              <View style={styles.lebalView}>
                <Text style={styles.lebal}>Title</Text>
                <View style={styles.contentView}>
                  <Text
                    style={{
                      ...FONTS.appFontSemiBold,
                      color: 'black',
                      margin: 2,
                      right: 8,
                    }}>
                    {item.title === null ? '-' : item.title}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={styles.lebalView}>
                  <Text style={styles.lebal}>Start Date</Text>

                  <Text style={styles.content}>
                    {item.start_date === null ? '-' : item.start_date}
                  </Text>
                </View>
                <View
                  style={{
                    right: 40,
                    flexDirection: 'column',
                    // padding: 10,
                    margin: 10,
                  }}>
                  <Text style={styles.lebal}>End Date</Text>

                  <Text style={styles.content}>
                    {item.end_date === null ? '-' : item.end_date}
                  </Text>
                </View>
              </View>

              <View style={styles.lebalView}>
                <Text style={styles.lebal}>Description</Text>
                <View style={styles.contentView}>
                  <Text
                    style={{
                      ...FONTS.appFontSemiBold,
                      color: 'black',
                      margin: 2,
                      right: 8,
                    }}>
                    {item.description === null ? '-' : item.description}
                  </Text>
                </View>
              </View>
              <View style={styles.lebalView}>
                <Text style={styles.lebal}>PDF</Text>

                <Text
                  style={{
                    ...FONTS.appFontSemiBold,
                    color: COLORS.skyBlue,
                    margin: 3,
                  }}
                  onPress={() => {
                    Linking.openURL(
                      item.pdf_file === null ? '-' : item.pdf_file,
                    );
                  }}>
                  View
                </Text>
              </View>

              <TouchableOpacity
                style={styles.editBtn}
                onPress={() =>
                  navigation.navigate('Edit Client Agreenent', {newData: item})
                }>
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
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  appContainer: {
    flex: 1,
    margin: 20,
    backgroundColor: COLORS.pureWhite,
    marginVertical: '1%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.pureWhite,

    // borderWidth:1
  },
  lebalView: {
    flexDirection: 'column',
    padding: 10,
  },
  contentView: {
    flexDirection: 'column',
    margin: 10,
  },
  lebal: {
    ...FONTS.appFontSemiBold,
    color: 'grey',
    padding: 2,
  },
  content: {
    ...FONTS.appFontSemiBold,
    color: 'black',
    margin: 2,
  },
  editBtn: {
    backgroundColor: COLORS.skyBlue,
    width: wp('80%'),
    height: hp('7%'),
    borderRadius: 10,
    alignSelf: 'center',
  },

  viewContainerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pdflinkText: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: '6%',
  },
  viewButton: {
    color: COLORS.blue,
    ...FONTS.appFontSemiBold,
  },
  closeButton: {
    fontSize: 15,
    marginTop: 50,
    marginLeft: 180,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 300,
    height: 200,
    alignSelf: 'center',
    marginTop: '90%',
    justifyContent: 'center',
  },
});

export default ClientAgreementMaster;
