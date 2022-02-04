import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import CustomNavigationBar from '../../components/CustomNavigationBar';
import DatePicker from 'react-native-datepicker';
import {COLORS, GLOBALSTYLES, FONTS} from '../../constants/theme';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AddResource = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [id, setId] = useState('Select External Resource');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [phone, setPhone] = useState('');
  const [exp, setExp] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [no, setNo] = useState('');
  const [language, setLanguage] = useState('Select Language');
  const [otherlanguage, setOtherLanguage] = useState('');
  const [resume, setResume] = useState('');
  const [resumet, setResumet] = useState('');
  const [contractf, setContractf] = useState('');
  const [contractft, setContractft] = useState('');
  const [ends, setEnds] = useState('');
  const [bench, setBench] = useState('');
  const [checklist, setChecklist] = useState('');
  const [passing, setPassing] = useState('');
  const [Other, setOther] = useState('');
  const [personal, setPersonal] = useState('');
  const [project, setProject] = useState('');
  const [pan, setPan] = useState('');
  const [pf, setPf] = useState('');
  const [flag, setFlag] = useState('');
  const [newData, setNewData] = useState([]);
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
      console.log(requestOptions);
      const data = await axios.get(
        'http://newresourcing.nimapinfotech.com/api/resource',
        requestOptions,
      );

      console.log(data.data.data.resources);

      setNewData(data.data.data.resources);
    } catch (error) {
      console.log(error);
    }
  };
  const postUser = async () => {
    const store = {
      "id": id,
      "fname": fname,
      "lname": language,
      "phone": phone,
      "exp_date": exp,
      "resident_address": address,
      "email": email,
      "refer_no": no,
      "language": language,
      "otherlanguage": otherlanguage,
      "resume": resume,
       "resume_type":null,
      "contract_file": contractf,
       "contract_file_type": null,
       "contract_start_date": startDate,
       "contract_end_date":endDate,
       "end_date": ends,
       "on_bench": bench,
       "checklist": checklist,
       "passing_year": passing,
       "other_docs": Other,
       "personal_email": personal,
       "project": project,
       "pan_link": pan,
       "pf_opt_out_form_link": pf,
       "flag":0
    };

    console.log('valu--------', store);

    try {
      const token = await AsyncStorage.getItem('token');

      const requestOptions = {
        method: 'POST',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        headers: {Authorization: 'Bearer ' + token},
      };

      const {data} = await axios.post(
        'http://newresourcing.nimapinfotech.com/api/resource',

        requestOptions,
      );
      console.log('check-------------->', data);
    } catch (err) {
      console.log('Error--------------------------->', err);
    }
  };
  const clientsOptions = newData.filter(t => t.fname !== null);
  const languageOptions = newData.filter(t => t.languages !== null);
  const experienceOptions = newData.filter(t => t.exp_date !== null);

  return (
    <SafeAreaView style={GLOBALSTYLES.mainContainer}>
      <CustomNavigationBar back={true} headername="Add Resource" />
      <ScrollView>
        <View
          style={{
            width: wp('90%'),
            height: hp('7%'),
            margin: 5,
            marginStart: 20,
            backgroundColor: COLORS.pureWhite,
            borderRadius: 10,
            marginTop: 10,
          }}>
          <Picker
            selectedValue={id}
            style={{margin: 5}}
            onValueChange={value => setId(value)}>
            <Picker.Item label="Select External Resource" value="" color='grey' />

            {clientsOptions.map((item, index) => (
              <Picker.Item
                key={item.id}
                label={item.fname}
                value={item.lname}
              />
            ))}
          </Picker>
        </View>

        <View style={GLOBALSTYLES.textInputView}>
          <TextInput
            placeholder="First Name*"
            style={GLOBALSTYLES.textInput}
            value={fname}
            onChangeText={data => setFname(data)}
          />
        </View>

        <View style={GLOBALSTYLES.textInputView}>
          <TextInput
            placeholder="Last Name*"
            style={GLOBALSTYLES.textInput}
            value={lname}
            onChangeText={data => setLname(data)}
          />
        </View>

        <View
          style={{
            width: wp('90%'),
            height: hp('7%'),
            margin: 5,
            flexDirection: 'row',
            backgroundColor: COLORS.pureWhite,
            marginStart: 20,
            borderRadius: 10,
          }}>
          <View
            style={{
              justifyContent: 'center',
              borderRadius: 10,
              padding: 5,

              backgroundColor: COLORS.whiteBlue,
            }}>
            <FontAwesome
              name="phone"
              size={25}
              style={{right: 10, marginStart: 20}}
            />
          </View>
          <TextInput
            placeholder="Phone Number*"
            style={GLOBALSTYLES.textInput}
            value={phone}
            onChangeText={data => setPhone(data)}
          />
        </View>

        <View
          style={{
            width: wp('90%'),
            height: hp('7%'),
            margin: 5,
            flexDirection: 'row',
            backgroundColor: COLORS.pureWhite,
            marginStart: 20,
            borderRadius: 10,
          }}>
          <View
            style={{
              justifyContent: 'center',
              borderRadius: 10,
              padding: 5,
              backgroundColor: COLORS.whiteBlue,
            }}>
            <EmailIcon
              name="email-outline"
              size={20}
              style={{right: 10, marginStart: 20}}
            />
          </View>
          <TextInput
            placeholder="Email Id*"
            style={GLOBALSTYLES.textInput}
            value={email}
            onChangeText={data => setEmail(data)}
          />
        </View>

        <View style={GLOBALSTYLES.textInputView}>
          <TextInput
            placeholder="Reference Number"
            style={GLOBALSTYLES.textInput}
            value={no}
            onChangeText={data => setNo(data)}
          />
        </View>

        <View
          style={{
            width: wp('90%'),
            height: hp('7%'),
            margin: 5,
            marginStart: 20,
            backgroundColor: COLORS.pureWhite,
            borderRadius: 10,
          }}>
          <Picker
            selectedValue={language}
            style={{margin: 5}}
            onValueChange={value => setLanguage(value)}>
            <Picker.Item label="Select Language" value="" color='grey' />

            {languageOptions.map((item, index) => (
              <Picker.Item
                key={item?.languages[0].id}
                label={item?.languages[0].technology}
                value={item?.languages[0].id}
              />
            ))}
          </Picker>
        </View>

        <View style={GLOBALSTYLES.textInputView}>
          <TextInput
            placeholder="Other Languages"
            style={GLOBALSTYLES.textInput}
            value={otherlanguage}
            onChangeText={data => setOtherLanguage(data)}
          />
        </View>

        <View
          style={{
            width: wp('90%'),
            height: hp('7%'),
            margin: 5,
            marginStart: 20,
            backgroundColor: COLORS.pureWhite,
            borderRadius: 10,
          }}>
          <Picker
            selectedValue={exp}
            style={{margin: 5}}
            onValueChange={value => setExp(value)}>
            <Picker.Item label="Select Experience Year" value="" color='grey' />

            {experienceOptions.map((item, index) => (
              <Picker.Item
                key={item.id}
                label={item.exp_date}
                value={item.id}
              />
            ))}
          </Picker>
        </View>

        <View
          style={{
            width: wp('90%'),
            height: hp('15%'),
            margin: 5,
            marginStart: 20,
            backgroundColor: COLORS.pureWhite,
            borderRadius: 10,
          }}>
          <TextInput
            placeholder=" Residential Address"
            style={GLOBALSTYLES.textInput}
            value={address}
            onChangeText={data => setAddress(data)}
          />
        </View>

        <View style={GLOBALSTYLES.textInputView}>
          <TextInput
            placeholder="Upload Resume"
            style={GLOBALSTYLES.textInput}
            value={resume}
            onChangeText={data => setResume(data)}
          />
        </View>
        <TouchableOpacity
          style={{
            width: wp('90%'),
            height: hp('7%'),
            margin: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: COLORS.pureWhite,
            marginStart: 20,
            borderRadius: 10,
          }}>
          <DatePicker
            date={startDate}
            value={startDate}
            style={{width: '100%', top: 7}}

            mode="date"
            placeholder="Contract Start Date"
            format="DD MMMM YYYY"
            minDate="01 01 2016"
            maxDate="01 01 2025"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={{
              dateInput: {
                borderWidth: 0,
                
                position: 'absolute',
                left: 20,
                ...FONTS.appFontSemiBold,

              },
            }}
            onDateChange={startDate => {
              setStartDate(startDate);
            }}
          />
          <FontAwesome
            name="calendar-o"
            size={20}
            style={{alignSelf: 'center', right: 30}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: wp('90%'),
            height: hp('7%'),
            margin: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: COLORS.pureWhite,
            marginStart: 20,
            borderRadius: 10,
          }}>
          <DatePicker
                      style={{width: '100%', top: 7}}

            date={endDate}
            value={endDate}
            mode="date"
            placeholder="Contract End Date"
            placeholder="Start Date"
            format="DD MMMM YYYY"
            minDate="01 01 2016"
            maxDate="01 01 2025"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={{
              dateInput: {
                borderWidth: 0,
                
                position: 'absolute',
                left: 20,
                ...FONTS.appFontSemiBold,},
            }}
            onDateChange={endDate => {
              setEndDate(endDate);
            }}
          />
          <FontAwesome
            name="calendar-o"
            size={20}
            style={{alignSelf: 'center', right: 30}}
          />
        </TouchableOpacity>

        <View style={GLOBALSTYLES.textInputView}>
          <TextInput
            placeholder=" Upload Contract"
            style={GLOBALSTYLES.textInput}
            value={contractf}
            onChangeText={data => setContractf(data)}
          />
        </View>

        <TouchableOpacity style={GLOBALSTYLES.buttonStyle} onPress={postUser}>
          <Text style={GLOBALSTYLES.textStyle}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddResource;
