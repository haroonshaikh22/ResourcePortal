import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {GLOBALSTYLES, COLORS, FONTS} from '../../constants/theme';
import SearchBox from '../../components/SearchBox';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorBox from 'react-native-vector-icons/MaterialCommunityIcons';
import {URL} from '../../constants/configure';
import Icon from 'react-native-vector-icons/FontAwesome';
const {height,width}=Dimensions.get('window')
const ClientRequest = ({navigation}) => {
  const [newData, setNewData] = useState([]);
  const [loding, setLoding] = useState(true);
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);

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
      console.log(requestOptions);
      const data = await axios.get(
        'http://newresourcing.nimapinfotech.com/api/client-request',
        requestOptions,
      );

      // console.log(data.data.data.technologies);
      setNewData(data.data.data.client_request);
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
          data.finance_name.toLowerCase().includes(search.toLowerCase()) ||
          data.finance_email.toLowerCase().includes(search.toLowerCase()) ||
          data.finance_contact_number.toLowerCase().includes(search.toLowerCase()) ||
          data.nationality.toLowerCase().includes(search.toLowerCase()) ||
          data.pan.toLowerCase().includes(search.toLowerCase()) ||
          data.gst.toLowerCase().includes(search.toLowerCase()) ||
          data.tan.toLowerCase().includes(search.toLowerCase()) 

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
        `http://newresourcing.nimapinfotech.com/api/client-request/${values}`,
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
                <Text style={GLOBALSTYLES.lebal}>Company Name</Text>
                <View style={GLOBALSTYLES.contentView}>
                  <Text style={GLOBALSTYLES.content}>
                    {item.company_name === null ? '-' : item.company_name}
                  </Text>
                </View>
              </View>
              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}>Finance Name</Text>
                <View style={GLOBALSTYLES.contentView}>
                  <Text style={GLOBALSTYLES.content}>
                    {item.finance_name === null ? '-' : item.finance_name}
                  </Text>
                </View>
              </View>
              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}>Finance Email Id</Text>
                <View style={GLOBALSTYLES.contentView}>
                  <Text style={GLOBALSTYLES.content}>
                    {item.finance_email === null ? '-' : item.finance_email}
                  </Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={GLOBALSTYLES.lebalView}>
                  <Text style={GLOBALSTYLES.lebal}>Finance Number</Text>

                  <Text style={GLOBALSTYLES.content}>
                    {item.finance_contact_number === null
                      ? '-'
                      : item.finance_contact_number}
                  </Text>
                </View>
                <View style={{ right: 40,
                    flexDirection: 'column',
                    margin: 10}}>
                  <Text style={GLOBALSTYLES.lebal}>Nationality</Text>

                  <Text style={GLOBALSTYLES.content}>
                    {item.nationality === null ? '-' : item.nationality}
                  </Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={GLOBALSTYLES.lebalView}>
                  <Text style={GLOBALSTYLES.lebal}>Gst Number</Text>

                  <Text style={GLOBALSTYLES.content}>
                    {item.gst === null ? '-' : item.gst}
                  </Text>
                </View>
                <View style={{  left: 50,
                    flexDirection: 'column',
                    margin: 10,}}>
                  <Text
                    style={{
                      ...FONTS.appFontSemiBold,
                      color: 'grey',
                      margin: 2,
                      right: 75,
                    }}>
                    Pan Number
                  </Text>

                  <Text
                    style={{
                      ...FONTS.appFontSemiBold,
                      color: COLORS.black,
                      margin: 2,
                      right: 75,
                    }}>
                    {item.pan === null ? '-' : item.pan}
                  </Text>
                </View>
              </View>

              <View style={GLOBALSTYLES.lebalView}>
                <Text style={GLOBALSTYLES.lebal}>Tan Number</Text>
                <View style={GLOBALSTYLES.contentView}>
                  <Text style={{color: COLORS.black}}>
                    {item.tan === null ? '-' : item.tan}
                  </Text>
                </View>
              </View>
      <View style = {{flexDirection:'row'}}>
              <Modal animationType='fade' transparent={true} 
                          visible={modalVisible}
                          onRequestClose={()=>{
                            Alert.alert("modal closed")
                            setModalVisible(!modalVisible)}}> 
                           <View styte={styles.viewContainerView}>
                             <View style={styles.modalView}>
                             <View>
                             <ErrorBox   style={styles.iconStyle}
                                name={'alert-box-outline'}
                                size={80}
                                color="red"/>
                                <Text style={styles.titleText}> Are you sure?</Text>
                                <View>
                                <Text style={styles.subTitleText}>You won't be able to revert this!</Text>
                                </View>
                                </View>
                       <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                             <TouchableOpacity style={styles.addButton} >
              <Text style={styles.addButtonText}>  Add  </Text>



                          </TouchableOpacity>
                  
                          <TouchableOpacity style={styles.updateButton}
                           onPress={()=>navigation.navigate('UpdateModal')} > 
              <Text style={styles.updateButtonText}>Update</Text>
                          </TouchableOpacity>
                          
                        

                           <TouchableOpacity style={styles.cancelButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
                          </TouchableOpacity>


 
                          </View>
                          </View> 
                          </View>
                        
                          </Modal>
                              
                         
                  <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}
                  style={{  backgroundColor: COLORS.lightGreen,
                    padding: 15,
                    flex: 1,
                    borderRadius: 10,
                    margin: 10,
                    right: 15,}}>
                  <Text style={GLOBALSTYLES.editText}>Accept</Text>
                </TouchableOpacity>
                <Modal animationType='fade' transparent={true} 
                          visible={visible}
                          onRequestClose={()=>{
                            Alert.alert("modal closed")
                            setVisible(!visible)}}> 
                           <View styte={styles.viewContainerView}>
                             <View style={styles.modalView}>
                            
                             <View>
                               <ErrorBox   style={styles.iconStyle}
                                name={'alert-box-outline'}
                                size={80}
                                color="red"/> 
                              <Text style={styles.titleText}> Are you sure?</Text>
                              <View>
                              <Text style={styles.subTitleText}>You won't be able to revert this!</Text>
                              </View>
                              </View>
                               <View style={{flexDirection:'row', justifyContent:"space-evenly"}}>
                          <TouchableOpacity style={styles.rejectButton}
              onPress={() => setVisible(!visible)}>
              <Text style={styles.rejectButtonText}>Yes, Reject it</Text>
                          </TouchableOpacity>
                           <TouchableOpacity style={styles.updateBtn}
              onPress={() => setVisible(!visible)}>
              <Text style={styles.updateBtnText}>Update</Text>
                          </TouchableOpacity>
                          </View>
                          </View>
                          </View>
                          </Modal>
                <TouchableOpacity onPress={()=>setVisible(!visible) }
                  style={GLOBALSTYLES.deleteBtn}>
                  <Text style={GLOBALSTYLES.deleteText}>Reject</Text>
                </TouchableOpacity>
               
                </View>
            </View>  
          )}
        />
      
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
 viewContainerView:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton:{
      backgroundColor:"green",
    borderRadius:10,
    padding:'5%',
    margin:'6%',
    position:'relative',
    top:10,
    width:width/3.5,
    left:10
    
  },
  addButtonText:{
    fontSize:17,
    alignSelf:'center',
    fontWeight:'bold',
    padding:1,
    color:'white'
  },

  updateButton:{
    backgroundColor:"orange",
    borderRadius:10,
    padding:'5%',
    margin:'6%',
    position:'relative',
    top:10,
    width:width/3.5
    
  },
  updateButtonText:{
    alignSelf:'center',
    fontWeight:'bold',
    color:'white',
    fontSize:17,
    color:'white'
  },
  
   cancelButton:{
    backgroundColor:"grey",
    borderRadius:10,
    padding:'5%',
    margin:'6%',
    position:'relative',
     top:10,
     width:width/3.5,
     right:10
  },
  cancelButtonText:{
    fontSize:17,
    alignSelf:'center',
    fontWeight:'bold',
    color:'white'
  },
   rejectButton:{
    backgroundColor:"red",
    borderRadius:10,
    padding:'5%',
    margin:'6%',
    position:'relative',
     top:20,
     left:8,
     width:width/2.4
  },
  rejectButtonText:{
    fontSize:17,
    alignSelf:'center',
    fontWeight:'bold',
    color:'white',
    alignSelf:'center',
    justifyContent:'center',
    padding:1
  },
  updateBtn:{
    backgroundColor:"orange",
    borderRadius:10,
    padding:'5%',
    margin:'6%',
    position:'relative',
    top:20,
    right:8,
    width:width/2.4
    
  },
  updateBtnText:{
    fontSize:17,
    fontWeight:'bold',
    alignSelf:'center',
    justifyContent:'center',
    color:'white'
   
   },
  
 

  
  iconStyle:{
    justifyContent:'center',
    alignSelf:'center',
    marginTop:10

      },
  
  titleText:{
    fontSize:17,
    fontWeight:'bold',
    alignSelf:'center',
    margin:2,
    
  },
  subTitleText:{
    fontSize:17,
    alignSelf:'center',
    
  },

 
  modalView:{
    width:width-20,
    backgroundColor: "white",
    borderRadius: 10,
    alignSelf:'center',
    marginTop:width/2,
    height:height/2.8
  },
})

export default ClientRequest;
