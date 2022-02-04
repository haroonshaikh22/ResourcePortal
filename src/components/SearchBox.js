import React from 'react';
import { TextInput, View} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import Icon from 'react-native-vector-icons/Ionicons';
import {GLOBALSTYLES,COLORS} from '../constants/theme';

const SearchBox = props => {
  const handleChangeValue = value => {
    props.setSearchValue(value);
  };
  return (
    <View style={{ width: wp('90%'),
    height: hp('7%'),
    margin: 5,
    flexDirection: 'row',
    backgroundColor: COLORS.pureWhite,
    marginStart: 20,
    borderRadius: 10,
    marginTop: 10,}}>
      <TextInput
        placeholder="search"
        style={GLOBALSTYLES.textInput}
        onChangeText={handleChangeValue}
        value={props.search}
      />

      {/* <Icon name="search-outline" size={20} style={GLOBALSTYLES.iconStyle} /> */}
    </View>
  );
};


export default SearchBox;
