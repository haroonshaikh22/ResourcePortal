import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import Fontisto from 'react-native-vector-icons/Fontisto'
import {createDrawerNavigator} from '@react-navigation/drawer';
import ResourcesMaster from '../screens/Resources/ResourcesMaster';
import ExternalResourcesMaster from '../screens/External Resources/ExternalResourcesMaster';
import TechnologyMaster from '../screens/Technology Master/TechnologyMaster';
import InvoiceHistory from '../screens/InvoiceHistory';
import CompareReport from '../screens/CompareReport';
import ProjectTarget from '../screens/ProjectTarget/ProjectTarget';
import ExternalProductMaster from '../screens/External Product/ExternalProductMaster';
import PurchaseOrderMaster from '../screens/Purchase Order/PurchaseOrderMaster';
import ClientAgreementMaster from '../screens/Client Agreement Master/ClientAgreementMaster';
import AccountMaster from '../screens/Account Master/AccountMaster';
import Vendor from '../screens/Vendor Master/Vendor';
import Home from '../screens/Home';
import Login from '../screens/Login';
import { StatusBar } from 'react-native';
import UserSetting from '../screens/User Setting/UserSetting';
import ClientRequest from '../screens/Client Request/ClientRequest';
import AddUserSetting from '../screens/User Setting/AddUserSetting';
import ClientMaster from '../screens/Client Master/ClientMaster';
const Drawer = createDrawerNavigator();

const DrawerNav = ({navigation}) => {
  return (
    <Drawer.Navigator initialRouteName="LoginScreen">
      <Drawer.Screen
        name="LoginScreen"
      
        component={Login}
        options={{headerShown: true,headerTitleAlign:'center'}}
      />

      <Drawer.Screen
        name="HomeScreen"
        component={Home}
        options={{headerShown: true,headerTitleAlign:'center'}}
      />

      <Drawer.Screen
        name="InvoiceHistory"
        component={InvoiceHistory}
        options={{headerShown: true,headerTitleAlign:'center'}}
      />
      <Drawer.Screen
        name="Compare Report"
        component={CompareReport}
        options={{headerShown: true,headerTitleAlign:'center',headerTitleAlign:'center'}}
      />
      <Drawer.Screen
        name="ProjectTarget"
        component={ProjectTarget}

        options={{headerShown: true,headerTitleAlign:'center',headerRight: () => <AntDesign 
          name='plus'
          size={25}
          color="black"
          style={{marginTop:'5%',marginEnd:'10%',fontWeight:'bold'}}
          onPress={() =>navigation.navigate('AddProjectScreen')}
          />}}
        />
      <Drawer.Screen
        name="Resources Master"
        component={ResourcesMaster}
        options={{headerShown: true,headerTitleAlign:'center',headerRight: () => <AntDesign 
          name='plus'
          size={25}
          color="black"
          style={{marginEnd:'10%',marginTop:'5%',fontWeight:'bold'}}
          onPress={() =>navigation.navigate('Add Resource')}
          />}}
        />
      <Drawer.Screen
        name="External Resources Master"
        component={ExternalResourcesMaster}
        options={{headerShown: true,headerTitleAlign:'center',headerRight: () => <AntDesign 
          name='plus'
          size={25}
          color="black"
          style={{marginEnd:'10%',marginTop:'5%',fontWeight:'bold'}}
          onPress={() =>navigation.navigate('Add External Resource')}
          />}}
        />

      <Drawer.Screen
        name="External Product Master"
        component={ExternalProductMaster}
        options={{headerShown: true,swipeEnabled: true,headerTitleAlign:'center', headerRight: () => <AntDesign 
          name='plus'
          size={25}
          color="black"
          style={{marginEnd:'10%',marginTop:'5%',fontWeight:'bold'}}
          onPress={() =>navigation.navigate('Add External Product')}
          />}}
        />
      <Drawer.Screen
        name="Purchase Order Master"
        component={PurchaseOrderMaster}
        options={{headerShown: true,headerTitleAlign:'center',headerRight: () => <AntDesign 
          name='plus'
          size={25}
          color="black"
          style={{marginEnd:'10%',marginTop:'5%',fontWeight:'bold'}}
          onPress={() =>navigation.navigate('Add Purchase Order')}
          />}}
        />
      
      <Drawer.Screen
        name="Client Agreement Master"
        component={ClientAgreementMaster}
        options={{headerShown: true,headerTitleAlign:'center',headerRight: () => <AntDesign 
          name='plus'
          size={25}
          color='black'
          style={{marginEnd:'10%',marginTop:'5%',fontWeight:'bold'}}
          onPress={() =>navigation.navigate('AddClientAgreementScreen')}
          />}}
      />
      <Drawer.Screen
        name="Account Master"
        component={AccountMaster}
        options={{headerShown: true,headerTitleAlign:'center',headerRight: () => <AntDesign 
        name='plus'
        size={25}
        color="black"
        style={{marginEnd:'10%',marginTop:'5%',fontWeight:'bold'}}
        onPress={() =>navigation.navigate('AddAccountantScreen')}
        />}}
      />
      <Drawer.Screen 
        name="Technology Master"
        component={TechnologyMaster}
        options={{headerShown: true,headerTitleAlign:'center',headerRight: () => <AntDesign 
          name='plus'
          size={25}
          color="black"
          style={{marginEnd:'10%',marginTop:'5%',fontWeight:'bold'}}
          onPress={() =>navigation.navigate('AddTechnologyScreen')}
          />}}
        />
        <Drawer.Screen 
        name="Vendor Master"
        component={Vendor}
        options={{headerShown: true,headerTitleAlign:'center',headerRight: () => <AntDesign 
          name='plus'
          size={25}
          color="black"
          style={{marginEnd:'10%',marginTop:'5%',fontWeight:'bold'}}
          onPress={() =>navigation.navigate('AddVendor')}
          />}}
        />
            <Drawer.Screen 
        name="User Setting"
        component={UserSetting}
        options={{headerShown: true,headerTitleAlign:'center',headerRight: () => <AntDesign 
          name='plus'
          size={25}
          color="black"
          style={{marginEnd:'10%',marginTop:'5%',fontWeight:'bold'}}
          onPress={() =>navigation.navigate('Add UserSetting')}

          />}}
        />
       <Drawer.Screen 
        name="Client Request"
        component={ClientRequest}
        options={{headerShown: true,headerTitleAlign:'center',headerRight: () => <AntDesign 
          // name={'plus'}
          size={25}
          color="black"
          style={{marginEnd:'10%',marginTop:'5%',fontWeight:'bold'}}
          />}}
        />
              <Drawer.Screen 
        name="Client Master"
        component={ClientMaster}
        options={{headerShown: true,headerTitleAlign:'center',headerRight: () => <AntDesign 
          name={'plus'}
          size={25}
          color="black"
          style={{marginEnd:'10%',marginTop:'5%',fontWeight:'bold'}}
          />}}
        />
      
    </Drawer.Navigator>
  );
};

export default DrawerNav;