import React from 'react';
import {Appbar, Button} from 'react-native-paper';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {COLORS} from '../constants/theme';
import {useNavigation} from '@react-navigation/native';

function CustomNavigationBar({
  navigation,
  back,
  headername,
  icon_name,
  navBtn,
}) {
  navigation = useNavigation();
  return (
    <View>
      <StatusBar backgroundColor={COLORS.pureWhite} barStyle="dark-content" />
      <Appbar.Header style={styles.appbarstyle}>
        {back ? (
          <Appbar.BackAction
            onPress={() => {
              navigation.goBack();
            }}
          />
        ) : null}
        <Appbar.Content
          subtitle={<Text style={{fontSize: 18,fontWeight:'bold', textAlign:'center'}}>{headername}</Text>}
          style={styles.titlestyle}
        />

        <Button
          icon={icon_name}
          color={COLORS.blue}
          style={{marginEnd: '1%'}}
          onPress={navBtn}
        />
      </Appbar.Header>
    </View>
  );
}
const styles = StyleSheet.create({
  appbarstyle: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.pureWhite,
    height: 60,
  },
  titlestyle: {
    marginBottom: '6%',
    fontSize: 25,
    color: COLORS.black,
    alignItems:'center'  },
});

export default CustomNavigationBar;
