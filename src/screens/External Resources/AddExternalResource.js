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


const AddExternalResource = () => {
  const [newData, setNewData] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  useEffect(() => {
    getResource();
    
  }, []);
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
  const postUser = async () => {
    // const store = {
      
    // }
    try {
      const token = await AsyncStorage.getItem('token');
  
      const requestOptions = {
        method: 'POST',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        headers: {Authorization: 'Bearer ' + token},
      };
  
      const {data} = await axios.post(
        'http://newresourcing.nimapinfotech.com/api/external-resource',
        values,
        requestOptions,
      );
  
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const clientsOptions = newData.filter(t=>t.vendor !== null)
  const expDate= newData.filter(t=>t.exp_date !== null)
  const checkList= newData.filter(t=>t.checklist !== null)
  const otherDocs = newData.filter(t=>t.other_docs !== null)
  const Pf = newData.filter(t=>t.pf_opt_out_form_link !== null)

  const handleSubmit = values => {
    postUser(values);
  };
  
  return (
<SafeAreaView style={styles.mainContainer}>
      <CustomNavigationBar back={true} headername="Add External Resource" />
      <ScrollView>

      <View style={styles.TextInputView}>
        <Picker
        selectedValue={selectedValue}
        style={styles.TextInput}
        onValueChange={(value)=> setSelectedValue (value)}
        >
          {clientsOptions.map((item,index)=>(
             <Picker.Item key={item.vendor.id}  label={item.vendor.company_name} value={item.vendor.id} />
          ))
          }
      </Picker>
      
    </View>
  
        <View style={styles.textInputView}>
          <TextInput
            placeholder="First Name*"
            style={styles.textInput}

          />
        </View>
      
        <View style={styles.textInputView}>
          <TextInput
            placeholder="Last Name*"
            style={styles.textInput}
         
          />
        </View>
     
        <View style={styles.textInputView}>
          <View style={styles.phoneIcon}>
          <FontAwesome
                    name="phone"
                    size={20}
                    style={GLOBALSTYLES.IconStyleAcc}
                  />
          </View>
          <TextInput
            placeholder="Phone Number*"
            style={styles.textInput}
           
          />
        </View>
     
        <View style={styles.textInputView}>
          <View style={styles.phoneIcon}>
            <EmailIcon
              name="email-outline"
              size={20}
              style={styles.iconStyle}
            />
          </View>
          <TextInput
            placeholder="Email Id*"
            style={styles.textInput}
            
          />
        </View>
       
        <View style={styles.TextInputView}>
        <Picker
        selectedValue={selectedValue}
        style={styles.TextInput}
        onValueChange={(value)=> setSelectedValue (value)}
     
        >
          {newData.map((item,index)=>(
             <Picker.Item key={item?.language[0].id}  label={item?.language[0].technology} value={item?.language[0].id} />
          ))
          }
      </Picker>
    </View>
   
    <View style={styles.TextInputView}>
        <Picker
        selectedValue={selectedValue}
        style={styles.TextInput}
        onValueChange={(value)=> setSelectedValue (value)}
        
        >
          {expDate.map((item,index)=>(
             <Picker.Item key={item.id}  label={item.exp_date} value={item.id} />
          ))
          }
      </Picker>
    </View>

        <View style={styles.textInputView}>
          <TextInput
            placeholder=" Residential Address"
            style={styles.textInput}
           
          />
        </View>
       
        <View style={styles.textInputView}>
          <TextInput
            placeholder="  Upload Resume"
            style={styles.textInput}
          
          />
        </View>
        
        <View style={styles.TextInputView}>
        <Picker
        selectedValue={selectedValue}
        style={styles.TextInput}
        onValueChange={(value)=> setSelectedValue (value)}
       
        >
          {checkList.map((item,index)=>(
             <Picker.Item key={item.id}  label={item.checklist} value={item.id} />
          ))
          }
      </Picker>
    </View>
   
    <View style={styles.TextInputView}>
        <Picker
        selectedValue={selectedValue}
        style={styles.TextInput}
        onValueChange={(value)=> setSelectedValue (value)}
      
        >
          {otherDocs.map((item,index)=>(
             <Picker.Item key={item.id}  label={item.other_docs} value={item.id} />
          ))
          }
      </Picker>
    </View>
    
        <View style={styles.textInputView}>
          <TextInput
            placeholder="Passing year*"
            style={styles.textInput}
          
          />
            
        </View>
      
        <View style={styles.textInputView}>
          <TextInput
            placeholder="Cost*"
            style={styles.textInput}
        
          />
            
        </View>
     
        <View style={styles.textInputView}>
          <TextInput
            placeholder="Adhaar number*"
            style={styles.textInput}
          
          />
            
        </View>
    
        <View style={styles.textInputView}>
          <TextInput
            placeholder="Pan number*"
            style={styles.textInput}
           
          />
                
        </View>
        <View style={styles.TextInputView}>
        <Picker
        selectedValue={selectedValue}
        style={styles.TextInput}
        onValueChange={(value)=> setSelectedValue (value)}
       
        >
          {Pf.map((item,index)=>(
             <Picker.Item key={item.id}  label={item.pf_opt_out_form_link} value={item.id} />
          ))
          }
      </Picker>
    </View>
   
        <TouchableOpacity style={styles.submitBtnEx} onPress={handleSubmit}>
          <Text style={styles.submitTextEx}>Submit</Text>
        </TouchableOpacity>
       
      </ScrollView>
    </SafeAreaView>
  );
};
const styles=StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  textInputView: {
    flexDirection: 'row',
    margin: 15,
    marginTop: '5%',
    padding: '1%',
    borderRadius: 10,
    backgroundColor: COLORS.pureWhite,
  },
  uploadBtnClient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5%',
    padding: 5,
    borderRadius: 10,
    backgroundColor: COLORS.lightBlue,
  },
  btnTextClient: {
    ...FONTS.appFontSemiBold,
  },
  submitBtnEx: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    marginHorizontal: 22,
    padding: '4%',
    margin: '5%',
    backgroundColor: COLORS.lightBlue,
  },
  submitTextEx: {
    color: COLORS.white,
    ...FONTS.appFontSemiBold,
  },
  phoneIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding:2,
    backgroundColor: COLORS.lightBlue,
  },
  iconStyle: {
    padding: '3%',
    margin: '1%',
  },
  
  errorText: {
    color: COLORS.red,
textAlign:'center'
  },
  textInput: {
    marginStart: '3%',
    fontSize: 15,
    flex: 1,
  },
  TextInputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '3%',
    borderRadius: 10,
    backgroundColor: COLORS.pureWhite,
  },
  TextInput: {
    flex: 1,
    marginStart: '3%',
    fontSize: 15,
  },
  textStyle: {
    alignSelf: 'center',
    ...FONTS.appFontSemiBold,
    marginVertical: '2%',
    color: COLORS.pureWhite,
    fontWeight: 'bold',
  },
  buttonStyle: {
    backgroundColor: COLORS.blue,
    padding: '3%',
    width: '90%',
    borderRadius: 10,
    marginTop: '5%',
    marginStart: '5%',
  },
})
export default AddExternalResource;