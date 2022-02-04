import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';
import {COLORS, GLOBALSTYLES,FONTS} from '../constants/theme';
import ProgressCircle from 'react-native-progress-circle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {DATA} from '../components/Dummi';
import CustomNavigationBar from '../components/CustomNavigationBar';

const Home = () => {
  const renderItem = ({item}) => (
    <View style={styles.compoStyles}>
      <View style={styles.textSameStyle}>
        <Text style={styles.innerTextFont}> Name: </Text>
        <Text style={styles.innerText}> {item.name} </Text>
      </View>
      <View style={styles.textSameStyle}>
        <Text style={styles.innerTextFont}> Address: </Text>
        <Text style={styles.innerText}> {item.address} </Text>
      </View>
      <View style={styles.textSameStyle}>
        <Text style={styles.innerTextFont}> Technology: </Text>
        <Text style={styles.innerText}>{item.Technology}</Text>
      </View>
      <View style={styles.textSameStyle}>
        <Text style={styles.innerTextFont}> Experience: </Text>
        <Text style={styles.innerText}> {item.Experience} </Text>
      </View>
      <View style={styles.textSameStyle}>
        <Text style={styles.innerTextFont}> CV: </Text>
        <Text style={styles.innerText}> {item.CV} </Text>
      </View>
      <View style={GLOBALSTYLES.textSameStyle}>
        <Text style={GLOBALSTYLES.innerTextFont}> Client Name: </Text>
        <Text style={GLOBALSTYLES.innerText}> {item.ClientName} </Text>
      </View>
      <View style={GLOBALSTYLES.textSameStyle}>
        <Text style={GLOBALSTYLES.innerTextFont}> End Date: </Text>
        <Text style={{...FONTS.appFontSemiBold, color: COLORS.orange}}>
          {item.EndDate}
        </Text>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.mainContainer}>
  
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.ProgressContainer}>
            <View style={styles.textViewHome}>
              <Text style={styles.textStyleHome}>Total Resources</Text>
              <Text style={styles.textStyles}>150</Text>
              <View style={styles.progressStyle}>
                <ProgressCircle
                  percent={100}
                  radius={50}
                  borderWidth={8}
                  color={COLORS.blue}
                  shadowColor={COLORS.lightBlue}
                  bgColor={COLORS.pureWhite}>
                  <View style={styles.iconBlue}>
                    <FontAwesome
                      style={styles.iconStyleBlue}
                      name={'group'}
                      size={32}
                      color={COLORS.blue}
                    />
                  </View>
                </ProgressCircle>
              </View>
            </View>

            <View style={styles.textViewHome}>
              <Text style={styles.textStyleHome}>In House Resources</Text>
              <Text style={styles.textStyles}>112</Text>
              <View style={styles.progressStyle}>
                <ProgressCircle
                  percent={60}
                  radius={50}
                  borderWidth={8}
                  color={COLORS.darkPink}
                  shadowColor={COLORS.lightPink}
                  bgColor={COLORS.pureWhite}>
                  <View style={styles.iconRed}>
                    <FontAwesome
                      style={styles.iconStyleRed}
                      name={'home'}
                      size={32}
                      color={COLORS.darkPink}
                    />
                  </View>
                </ProgressCircle>
              </View>
            </View>
          </View>
          <View style={styles.compoStyle}>
            <View style={styles.compoSpaceStyle}>
              <Text style={styles.headerText}> Total Clients </Text>
              <TouchableOpacity>
                <AntDesign
                  style={styles.iconStyle}
                  name={'arrowright'}
                  size={26}
                  color={COLORS.pureWhite}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.textSameStyle}>
              <Text style={styles.innerText}> Sharekhan </Text>
              <Text style={styles.innerText}> 25 </Text>
            </View>
            <View style={styles.textSameStyle}>
              <Text style={styles.innerText}> Linkin Time </Text>
              <Text style={styles.innerText}> 13 </Text>
            </View>
            <View style={styles.textSameStyle}>
              <Text style={styles.innerText}> Brand Catalyst Media </Text>
              <Text style={styles.innerText}> 11 </Text>
            </View>
            <View style={styles.textSameStyle}>
              <Text style={styles.innerText}> Linkin Time </Text>
              <Text style={styles.innerText}> 7 </Text>
            </View>
          </View>
          <View style={styles.compoStyle}>
            <View style={styles.compoSpaceStyle}>
              <Text style={styles.headerText}> Notes </Text>
              <TouchableOpacity>
                <AntDesign
                  style={styles.iconStyle}
                  name={'plus'}
                  size={20}
                  color={COLORS.pureWhite}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.textSameStyle}>
              <Text style={{...FONTS.appFontSemiBold, fontWeight: 'bold'}}>
                Soniya payment pending
              </Text>
              <TouchableOpacity style={{marginStart: '6%'}}>
                <SimpleLineIcons
                  style={styles.iconStyle}
                  name="pencil"
                  color={COLORS.orange}
                  size={16}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginStart: '6%'}}>
                <AntDesign
                  style={styles.iconStyle}
                  name={'delete'}
                  size={16}
                  color={COLORS.red}
                />
              </TouchableOpacity>
            </View>
            <Text style={{...FONTS.appFontSmallBold, marginStart: '3%'}}>
              Added by: Sagar
            </Text>
            <Text style={{...FONTS.appFontSmallBold, marginStart: '3%'}}>
              Last Modified: 23 Oct 2020 (by Sagar)
            </Text>

            <View style={styles.textSameStyle}>
              <Text style={{...FONTS.appFontSemiBold, fontWeight: 'bold'}}>
                Amit payment pending by
              </Text>
              <TouchableOpacity style={{marginStart: '6%'}}>
                <SimpleLineIcons
                  style={styles.iconStyle}
                  name="pencil"
                  color={COLORS.orange}
                  size={16}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginStart: '6%'}}>
                <AntDesign
                  style={styles.iconStyle}
                  name={'delete'}
                  size={16}
                  color={COLORS.red}
                />
              </TouchableOpacity>
            </View>

            <Text
              style={{
                ...FONTS.appFontSemiBold,
                marginStart: '4%',
                fontWeight: 'bold',
                marginBottom: '1%',
              }}>
              Accounts Team
            </Text>
            <Text style={{...FONTS.appFontSmallBold, marginStart: '3%'}}>
              Added by: Sagar
            </Text>
            <Text style={{...FONTS.appFontSmallBold, marginStart: '3%'}}>
              Last Modified: 23 Oct 2020 (by Sagar)
            </Text>
          </View>

          <View style={styles.compoStyle}>
            <View style={styles.compoSpaceStyle}>
              <Text style={styles.headerText}> Resources (Upcoming)</Text>
              <TouchableOpacity>
                <AntDesign
                  style={styles.iconStyle}
                  name={'arrowright'}
                  size={24}
                  color={COLORS.pureWhite}
                />
              </TouchableOpacity>
            </View>
            {/* <FlatList data={DATA} renderItem={renderItem} /> */}
          </View>

          <View style={styles.compoStyle}>
            <View style={styles.compoSpaceStyle}>
              <Text style={styles.headerText}>
                Resource Contract Ends 30d
              </Text>
              <TouchableOpacity>
                <AntDesign
                  style={styles.iconStyle}
                  name={'arrowright'}
                  size={24}
                  color={COLORS.pureWhite}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.textSameStyle}>
              <Text style={styles.innerTextFont}> Shwetali Sangle </Text>
              <Text style={styles.innerText}> 25 Days </Text>
            </View>
            <View style={styles.textSameStyle}>
              <Text style={styles.innerTextFont}>Illena D'Cruz</Text>
              <Text style={styles.innerText}> 13 Days </Text>
            </View>
            <View style={styles.textSameStyle}>
              <Text style={styles.innerTextFont}> Omkar Joshi </Text>
              <Text style={styles.innerText}> 11Days </Text>
            </View>
            <View style={styles.textSameStyle}>
              <Text style={styles.innerTextFont}> Ajay Kumbhar </Text>
              <Text style={styles.innerText}> 7 Days </Text>
            </View>
          </View>
          <View style={styles.compoStyle}>
            <View style={styles.compoSpaceStyle}>
              <Text style={styles.headerText}>
                Purchase Order Ends 30d
              </Text>
              <TouchableOpacity>
                <AntDesign
                  style={styles.iconStyle}
                  name={'arrowright'}
                  size={24}
                  color={COLORS.pureWhite}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.textSameStyle}>
              <Text style={styles.innerTextFont}> Shwetali Sangle </Text>
              <Text style={styles.innerText}> 25 Days </Text>
            </View>
            <View style={styles.textSameStyle}>
              <Text style={styles.innerTextFont}>Illena D'Cruz</Text>
              <Text style={styles.innerText}> 13 Days </Text>
            </View>
            <View style={styles.textSameStyle}>
              <Text style={styles.innerTextFont}> Omkar Joshi </Text>
              <Text style={styles.innerText}> 11Days </Text>
            </View>
            <View style={styles.textSameStyle}>
              <Text style={styles.innerTextFont}> Ajay Kumbhar </Text>
              <Text style={styles.innerText}> 7 Days </Text>
            </View>
          </View>
          <View style={styles.compoStyle}>
            <View style={styles.compoSpaceStyle}>
              <Text style={styles.headerText}>
                Clients Agreement Ends 30d
              </Text>
              <TouchableOpacity>
                <AntDesign
                  style={styles.iconStyle}
                  name={'arrowright'}
                  size={24}
                  color={COLORS.pureWhite}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.textSameStyle}>
              <Text style={styles.innerTextFont}> Shwetali Sangle </Text>
              <Text style={styles.innerText}> 25 Days </Text>
            </View>
            <View style={styles.textSameStyle}>
              <Text style={styles.innerTextFont}>Illena D'Cruz</Text>
              <Text style={styles.innerText}> 13 Days </Text>
            </View>
            <View style={styles.textSameStyle}>
              <Text style={styles.innerTextFont}> Omkar Joshi </Text>
              <Text style={styles.innerText}> 11Days </Text>
            </View>
            <View style={styles.textSameStyle}>
              <Text style={styles.innerTextFont}> Ajay Kumbhar </Text>
              <Text style={styles.innerText}> 7 Days </Text>
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
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  ProgressContainer: {
    flexDirection: 'row',
    marginTop: '5%',
    justifyContent: 'space-evenly',
    // borderWidth:1
  },
  textViewHome: {
    width: '43%',
    backgroundColor: COLORS.pureWhite,
  },
  textStyleHome: {
    ...FONTS.appFontSemiBold,
    marginStart: '10%',
  },
  textStyles: {
    ...FONTS.appFontBold,
    fontWeight: 'bold',
    marginTop: '5%',
    marginStart: '12%',
  },
  progressStyle: {
    marginStart: '30%',
    marginBottom: '5%',
  },
  iconBlue: {
    width: '70%',
    height: '70%',
    backgroundColor: COLORS.lightBlue,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRed: {
    width: '70%',
    height: '70%',
    backgroundColor: COLORS.lightPink,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compoStyle: {
    marginTop: '5%',
    borderRadius: 10,
    marginHorizontal: '5%',
    backgroundColor: COLORS.pureWhite,
  },
  compoStyles: {
    marginTop: '1%',
    borderRadius: 10,
    marginHorizontal: '5%',
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
  textSameStyle: {
    flexDirection: 'row',
    padding: '3%',
  },
  innerText: {
    width: '60%',
    color: 'black',
    ...FONTS.appFontSemiBold,
  },
  innerTextFont: {
    justifyContent: 'space-between',
    width: '40%',
    color: COLORS.grey,
    ...FONTS.appFontSemiBold,
    marginStart: '2%',
  },
  headerText: {
    color: COLORS.pureWhite,
    ...FONTS.appFontSemiBold,
  },


})
export default Home;
