import React, {useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import CustomNavigationBar from '../../components/CustomNavigationBar';
import {GLOBALSTYLES,COLORS,FONTS} from '../../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const EditExternalResource = ({navigation,route}) => {
  const [newData, setNewData] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [data, setData] = useState({});
  console.log('valuess', route.params.newData.id);

  useEffect(() => {
    getResource();
    setData(route.params.newData);
    setStartDate(route.params.newData.date)
  }, []);
  console.log('get----------', route.params.newData)

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
       'http://newresourcing.nimapinfotech.com/api/external-resource',
        requestOptions,
      );

      // console.log(data.data.data.externalResource);

      setNewData(data.data.data.externalResource);
    } catch (error) {
      console.log(error);

    }
  };

  //post
  const putUser = async () => {
    const store = {
      "resource":id,
      "date":startDate
    }
    console.log('check------------->>>>',store);

    try {
      
      const token = await AsyncStorage.getItem('token');
  
      const requestOptions = {
        method: 'PUT',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        headers: {Authorization: 'Bearer ' + token},
      };
  
      const {data} = await axios.put(
       `http://newresourcing.nimapinfotech.com/api/external-resource/${id}`,
        store,
        requestOptions,
      );
      setData(route.params.newData);

      console.log('check-------------->', data)
    } catch (err) {
      console.log("Error--------------------------->",err);
    }
  };
  return (
<SafeAreaView style={GLOBALSTYLES.mainContainer}>
      <CustomNavigationBar back={true} headername="Add External Resource" />
      <ScrollView>

      <View style={GLOBALSTYLES.textInputView}>
        <Picker
        selectedValue={selectedValue}
        style={GLOBALSTYLES.textInput}
        onValueChange={(value)=> setSelectedValue (value)}
        >
          {clientsOptions.map((item,index)=>(
             <Picker.Item key={item.vendor.id}  label={item.vendor.company_name} value={item.vendor.id} />
          ))
          }
      </Picker>
      
    </View>
  
        <View style={GLOBALSTYLES.textInputView}>
          <TextInput
            placeholder="First Name*"
            style={GLOBALSTYLES.textInput}

          />
        </View>
      
        <View style={GLOBALSTYLES.textInputView}>
          <TextInput
            placeholder="Last Name*"
            style={GLOBALSTYLES.textInput}
         
          />
        </View>
     
        <View style={GLOBALSTYLES.textInputView}>
        <View
                    style={{
                      justifyContent: 'center',
                      borderRadius: 10,
                      padding: 5,
                      backgroundColor: COLORS.whiteBlue,
                    }}>
                    <FontAwesome
                      color={COLORS.lightBlue}
                      name="phone"
                      size={30}
                      style={{right: 10, marginStart: 20}}
                    />
                  </View>
          <TextInput
            placeholder="Phone Number*"
            style={GLOBALSTYLES.textInput}
           
          />
        </View>
     
        <View style={GLOBALSTYLES.textInputView}>
        <View
                    style={{
                      justifyContent: 'center',
                      borderRadius: 10,
                      padding: 5,
                      backgroundColor: COLORS.whiteBlue,
                    }}>
                    <MaterialCommunityIcons
                      color={COLORS.lightBlue}
                      name="email-outline"
                      size={25}
                      style={{right: 10, marginStart: 20}}
                    />
                  </View>
          <TextInput
            placeholder="Email Id*"
            style={GLOBALSTYLES.textInput}
            
          />
        </View>
       
        <View style={GLOBALSTYLES.textInputView}>
        <Picker
        selectedValue={selectedValue}
        style={GLOBALSTYLES.textInput}
        onValueChange={(value)=> setSelectedValue (value)}
     
        >
          {newData.map((item,index)=>(
             <Picker.Item key={item?.language[0].id}  label={item?.language[0].technology} value={item?.language[0].id} />
          ))
          }
      </Picker>
    </View>
   
    <View style={GLOBALSTYLES.TextInputView}>
        <Picker
        selectedValue={selectedValue}
        style={GLOBALSTYLES.TextInput}
        onValueChange={(value)=> setSelectedValue (value)}
        
        >
          {expDate.map((item,index)=>(
             <Picker.Item key={item.id}  label={item.exp_date} value={item.id} />
          ))
          }
      </Picker>
    </View>

        <View style={GLOBALSTYLES.textInputView}>
          <TextInput
            placeholder=" Residential Address"
            style={Text.textInput}
           
          />
        </View>
       
        <View style={GLOBALSTYLES.textInputView}>
          <TextInput
            placeholder="  Upload Resume"
            style={GLOBALSTYLES.textInput}
          
          />
        </View>
        
        <View style={GLOBALSTYLES.textInputView}>
        <Picker
        selectedValue={selectedValue}
        style={GLOBALSTYLES.textInput}
        onValueChange={(value)=> setSelectedValue (value)}
       
        >
          {checkList.map((item,index)=>(
             <Picker.Item key={item.id}  label={item.checklist} value={item.id} />
          ))
          }
      </Picker>
    </View>
   
    <View style={GLOBALSTYLES.textInputView}>
        <Picker
        selectedValue={selectedValue}
        style={GLOBALSTYLES.textInput}
        onValueChange={(value)=> setSelectedValue (value)}
      
        >
          {otherDocs.map((item,index)=>(
             <Picker.Item key={item.id}  label={item.other_docs} value={item.id} />
          ))
          }
      </Picker>
    </View>
    
        <View style={GLOBALSTYLES.textInputView}>
          <TextInput
            placeholder="Passing year*"
            style={GLOBALSTYLES.textInput}
          
          />
            
        </View>
      
        <View style={GLOBALSTYLES.textInputView}>
          <TextInput
            placeholder="Cost*"
            style={GLOBALSTYLES.textInput}
        
          />
            
        </View>
     
        <View style={GLOBALSTYLES.textInputView}>
          <TextInput
            placeholder="Adhaar number*"
            style={GLOBALSTYLES.textInput}
          
          />
            
        </View>
    
        <View style={GLOBALSTYLES.textInputView}>
          <TextInput
            placeholder="Pan number*"
            style={GLOBALSTYLES.textInput}
           
          />
                
        </View>
        <View style={GLOBALSTYLES.textInputView}>
        <Picker
        selectedValue={selectedValue}
        style={GLOBALSTYLES.TextInput}
        onValueChange={(value)=> setSelectedValue (value)}
       
        >
          {Pf.map((item,index)=>(
             <Picker.Item key={item.id}  label={item.pf_opt_out_form_link} value={item.id} />
          ))
          }
      </Picker>
    </View>
   
        <TouchableOpacity style={GLOBALSTYLES.editBtn} onPress={()=> putUser()}>
          <Text style={styles.submitTextEx}>Submit</Text>
        </TouchableOpacity>
       
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditExternalResource;