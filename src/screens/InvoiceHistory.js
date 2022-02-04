import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../constants/theme';
// import DateTimePicker from '@react-native-community/datetimepicker';
import SearchBox from '../components/SearchBox';
import CustomNavigationBar from '../components/CustomNavigationBar';
import CheckBox from '@react-native-community/checkbox';
const InvoiceHistory = () => {
  // const [date, setDate] = useState(new Date(1598051730000));
  // const [mode, setMode] = useState('date');
  // const [show, setShow] = useState(false);

  //checkBox
  const [isSelected, setSelection] = useState(false);

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShow(Platform.OS === 'ios');
  //   setDate(currentDate);
  // };

  // const showMode = currentMode => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  // const showDatepicker = () => {
  //   showMode('date');
  // };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
      <CustomNavigationBar
        back={true}
        headername="Invoice History"
      />
        <View style={styles.containerView}>
          <SearchBox />
          {/* <View style={styles.selectorView}>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={showDatepicker}>
              <Text>Select Year</Text>
              <Icon name="angle-down" size={15} style={styles.IconStyle} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.selectButton}
              onPress={showDatepicker}>
              <Text>Select Month</Text>
              <Icon name="angle-down" size={15} style={styles.IconStyle} />
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View> */}

          <View style={styles.BodyContainer}>
            <View style={styles.Details}>
              <View style={styles.titleView}>
                <Text style={styles.titleIn}> Month:</Text>
                <Text style={styles.titleOut}>April 2020</Text>
              </View>
              <View style={styles.titleView}>
                <Text style={styles.titleIn}>Client Name:</Text>
                <Text style={styles.titleOut}>Fino Payments Bank Ltd</Text>
              </View>
              <View style={styles.titleView}>
                <Text style={styles.titleIn}>Total Resources</Text>
                <Text style={styles.titleOut}>2</Text>
              </View>
            </View>

            <View style={styles.checkboxContainer}>
              <View style={styles.checkBoxView}>
                <Text>Pay</Text>
                <CheckBox
                  value={isSelected}
                  onValueChange={setSelection}
                  style={styles.checkbox}
                />
              </View>

              <View style={styles.checkBoxView}>
                <Text>Inv</Text>
                <CheckBox
                  value={isSelected}
                  onValueChange={setSelection}
                  style={styles.checkbox}
                />
              </View>

              <View style={styles.checkBoxView}>
                <Text>HC</Text>
                <CheckBox
                  value={isSelected}
                  onValueChange={setSelection}
                  style={styles.checkbox}
                />
              </View>

              <View style={styles.checkBoxView}>
                <Text>PF</Text>
                <CheckBox
                  value={isSelected}
                  onValueChange={setSelection}
                  style={styles.checkbox}
                />
              </View>
              <View style={styles.checkBoxView}>
                <Text>TS</Text>
                <CheckBox
                  value={isSelected}
                  onValueChange={setSelection}
                  style={styles.checkbox}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
  },
  headerView: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  containerView: {
    marginHorizontal: '3%',
    marginVertical: 10,
  },
  TextInputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '3%',
    padding: 2,
    borderRadius: 10,
    backgroundColor: COLORS.pureWhite,
  },
  IconStyle: {
    padding: 10,
    margin: 5,
  },

  selectorView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '5%',
    alignItems: 'center',
  },

  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    width: '48%',
    paddingHorizontal: 20,
    backgroundColor: COLORS.pureWhite,
    textAlign: 'center',
  },
  BodyContainer: {
    alignItems: 'center',
    marginHorizontal: '3%',
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: COLORS.pureWhite,
  },
  Details: {
    flexDirection: 'column',
  },
  titleView: {
    flexDirection: 'row',
    padding: '8%',
  },
  titleIn: {
    textAlign: 'left',
    justifyContent: 'space-between',
    width: '45%',
    color: COLORS.grey,
    fontSize: 15,
  },
  titleOut: {
    textAlign: 'right',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: '10%',
    color: 'black',
    marginStart: 2,
    fontSize: 15,
    alignSelf: 'baseline',
  },

  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkBoxView: {
    flexDirection: 'column',
    padding: 10,
  },
  checkbox: {
    alignSelf: 'center',
    fontSize: 0,
    padding: 10,
  },
});

export default InvoiceHistory;