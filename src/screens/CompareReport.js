import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import SearchBox from '../components/SearchBox';
// import DateTimePicker from '@react-native-community/datetimepicker';
import {COLORS} from '../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CompareReport = () => {
  // const [date, setDate] = useState(new Date(1598051730000));
  // const [mode, setMode] = useState('date');
  // const [show, setShow] = useState(false);

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
      <ScrollView style={styles.containerView}>
        <SearchBox />
{/* 
        <View style={styles.selectorView}>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={showDatepicker}>
            <Text>From Date</Text>
            <Icon name="calendar-o" size={15} style={styles.IconStyle} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.selectButton}
            onPress={showDatepicker}>
            <Text>To Date</Text>
            <Icon name="calendar-o" size={15} style={styles.IconStyle} />
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

        <View style={styles.compoStyle}>
          <View style={styles.compoSpaceStyle}>
            <Text style={{color: COLORS.pureWhite, fontSize: 15}}>
              Interview{' '}
            </Text>
            <AntDesign
              style={styles.iconStyle}
              name={'arrowright'}
              size={16}
              color={COLORS.pureWhite}
            />
          </View>

          <View style={styles.textView}>
            <Text style={(styles.textTitle, {color: COLORS.blue})}>
              Total
            </Text>
            <Text style={styles.textCount}> 25 </Text>
          </View>
          <View style={styles.textView}>
            <Text style={(styles.textTitle, {color: COLORS.green})}>
              
              Selected{' '}
            </Text>
            <Text style={styles.textCount}> 13 </Text>
          </View>
          <View style={styles.textView}>
            <Text style={(styles.textTitle, {color: COLORS.darkPink})}>
              {' '}
              Rejected{' '}
            </Text>
            <Text style={styles.textCount}> 11 </Text>
          </View>
          <View style={styles.textView}>
            <Text style={(styles.textTitle, {color: COLORS.orange})}>
              No Action
            </Text>
            <Text style={styles.textCount}> 7 </Text>
          </View>
        </View>

        <View style={styles.compoStyle}>
          <View style={styles.compoSpaceStyle}>
            <Text style={{color: COLORS.pureWhite, fontSize: 15}}>
              Joining
            </Text>
            <AntDesign
              style={styles.iconStyle}
              name={'arrowright'}
              size={26}
              color={COLORS.pureWhite}
            />
          </View>

          <View style={styles.textView}>
            <Text style={(styles.textTitle, {color: COLORS.blue})}>
              Total
            </Text>
            <Text style={styles.textCount}> 25 </Text>
          </View>
        </View>

        <View style={styles.compoStyle}>
          <View style={styles.compoSpaceStyle}>
            <Text style={{color: COLORS.pureWhite, fontSize: 15}}>
              Non Joining
            </Text>
            <AntDesign
              style={styles.iconStyle}
              name={'arrowright'}
              size={26}
              color={COLORS.pureWhite}
            />
          </View>

          <View style={styles.textView}>
            <Text style={(styles.textTitle, {color: COLORS.blue})}>
              Total
            </Text>
            <Text style={styles.textCount}> 25 </Text>
          </View>
        </View>

        <View style={styles.compoStyle}>
          <View style={styles.compoSpaceStyle}>
            <Text style={{color: COLORS.pureWhite, fontSize: 15}}>
              Project Target
            </Text>
            <AntDesign
              style={styles.iconStyle}
              name={'arrowright'}
              size={26}
              color={COLORS.pureWhite}
            />
          </View>

          <View>
            <View style={styles.BodyContainer}>
              <View style={styles.Details}>
                <View style={styles.textTitleView}>
                  <Text style={styles.titleIn}> Name:</Text>
                  <Text style={styles.titleOut}>Shwetali Sangle</Text>
                </View>
                <View style={styles.textTitleView}>
                  <Text style={styles.titleIn}>Language:</Text>
                  <Text style={styles.titleOut}>E-Commerce Expert</Text>
                </View>
                <View style={styles.textTitleView}>
                  <Text style={styles.titleIn}>Address</Text>
                  <Text style={styles.titleOut}>
                    36/A, Ajanta complex, Near KEM Hosp, Maharashtra 401200
                  </Text>
                </View>
                <View style={styles.textTitleView}>
                  <Text style={styles.titleIn}>Target</Text>
                  <Text style={(styles.titleOut, {color: COLORS.orange})}>
                    2 Days
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.BodyContainer}>
              <View style={styles.Details}>
                <View style={styles.textTitleView}>
                  <Text style={styles.titleIn}> Name:</Text>
                  <Text style={styles.titleOut}>Shwetali Sangle</Text>
                </View>
                <View style={styles.textTitleView}>
                  <Text style={styles.titleIn}>Language:</Text>
                  <Text style={styles.titleOut}>E-Commerce Expert</Text>
                </View>
                <View style={styles.textTitleView}>
                  <Text style={styles.titleIn}>Address</Text>
                  <Text style={styles.titleOut}>
                    36/A, Ajanta complex, Near KEM Hosp, Maharashtra 401200
                  </Text>
                </View>
                <View style={styles.textTitleView}>
                  <Text style={styles.titleIn}>Target</Text>
                  <Text style={(styles.titleOut, {color: COLORS.orange})}>
                    2 Days
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  containerView: {
    marginHorizontal: '3%',
    marginVertical: '3%',
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
  IconStyle: {
    padding: 10,
    margin: 5,
  },

  compoStyle: {
    marginTop: '5%',
    borderRadius: 10,
    marginHorizontal: '3%',
    backgroundColor: COLORS.pureWhite,
  },
  compoSpaceStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '5%',
    backgroundColor: COLORS.lightBlue,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textView: {
    backgroundColor: COLORS.pureWhite,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '3%',
    padding: 10,
  },
  textTitle: {
    fontSize: 15,
    borderWidth: 1,
    borderColor: 1,
  },
  textCount: {
    fontSize: 15,
    color: COLORS.black,
    borderWidth: 1,
    borderColor: 1,
  },

  BodyContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: COLORS.pureWhite,
  },
  Details: {
    flexDirection: 'column',
  },
  textTitleView: {
    flexDirection: 'row',
    padding: 10,
  },
  titleIn: {
    textAlign: 'left',
    justifyContent: 'space-between',
    width: '35%',
    color: COLORS.grey,
    fontSize: 15,
  },
  titleOut: {
    width: '70%',
    color: 'black',
    fontSize: 15,
  },
});

export default CompareReport;