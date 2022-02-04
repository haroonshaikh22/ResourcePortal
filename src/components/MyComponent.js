import * as React from 'react';
import {Appbar} from 'react-native-paper';
import {COLORS} from '../constants/theme';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const MyComponent = () => {
  return (
    <View>
      <StatusBar backgroundColor={COLORS.pureWhite} barStyle="dark-content" />
      <Appbar.Header
        style={{backgroundColor: COLORS.pureWhite, marginStart: '5%'}}>
        <Appbar.Content title="Hi,Sonathan" />
        <TouchableOpacity style={styles.btnStyle}>
          <Ionicons
            style={styles.iconStyle}
            name={'chevron-down-sharp'}
            size={26}
            color={COLORS.blue}
          />
        </TouchableOpacity>
      </Appbar.Header>
    </View>
  );
};
const styles = StyleSheet.create({
  subtitleText: {
    color: COLORS.pureblue,
    fontWeight: 'bold',
    margin: 0,
    alignContent: 'center',
    justifyContent: 'center',
  },
  titlestyle: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    color: COLORS.pureblue,
  },
  btnStyle: {
    position: 'absolute',
    padding: '2%',
    right: '0%',
    marginEnd: '2%',
  },
  btnStyles: {
    left: '0%',
  },
  iconStyle:{
    marginBottom:110
    }
});

export default MyComponent;
