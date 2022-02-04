import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import ProjectTarget from './src/screens/ProjectTarget/ProjectTarget';
import AddProjectTarget from './src/screens/ProjectTarget/AddProjectTarget';
import ClientAgreementMaster from './src/screens/Client Agreement Master/ClientAgreementMaster';
import AddClientAgreement from './src/screens/Client Agreement Master/AddClientAgreement';
import AccountMaster from './src/screens/Account Master/AccountMaster';
import AddAccountant from './src/screens/Account Master/AddAccountant';
import TechnologyMaster from './src/screens/Technology Master/TechnologyMaster';
import AddTechnology from './src/screens/Technology Master/AddTechnology';
import InvoiceHistory from './src/screens/InvoiceHistory';
import CompareReport from './src/screens/CompareReport';
import ResourcesMaster from './src/screens/Resources/ResourcesMaster';
import AddResource from './src/screens/Resources/AddResource';
import ExternalResourcesMaster from './src/screens/External Resources/ExternalResourcesMaster';
import AddExternalResource from './src/screens/External Resources/AddExternalResource';
import ExternalProductMaster from './src/screens/External Product/ExternalProductMaster'; 
import AddExternalProduct from './src/screens/External Product/AddExternalProduct';
import PurchaseOrderMaster from './src/screens/Purchase Order/PurchaseOrderMaster';
import AddPurchaseOrder from './src/screens/Purchase Order/AddPurchaseOrder';
import DrawerNav from './src/components/DrawerNav';
import ForgotPassword from './src/screens/ForgotPassword';
import EditScreen from './src/screens/Account Master/EditScreen';
import Vendor from './src/screens/Vendor Master/Vendor';
import AddVendor from './src/screens/Vendor Master/AddVendor';
import UserSetting from './src/screens/User Setting/UserSetting';
import ClientRequest from './src/screens/Client Request/ClientRequest';
import EditTechnology from './src/screens/Technology Master/EditTechnology';
import EditExternalProduct from './src/screens/External Product/EditExternalProduct';
import EditPurchaseOrder from './src/screens/Purchase Order/EditPurchase'
import EditProjectTarget from './src/screens/ProjectTarget/EditProjectTarget';
import EditClientAgreement from './src/screens/Client Agreement Master/EditClientAgreement'
import EditExternalResource from './src/screens/External Resources/EditExternalResource';
import EditResource from './src/screens/Resources/EditResource';
import EditVendor from './src/screens/Vendor Master/EditVendor';
import AddUserSetting from './src/screens/User Setting/AddUserSetting';
import UpdateModal from './src/screens/Client Request/UpdateModal'
import EditUserSetting from './src/screens/User Setting/Edit UserSetting'
import ClientMaster from './src/screens/Client Master/ClientMaster';
const Stack = createNativeStackNavigator();


const App = () => {
  return (

  <NavigationContainer>
      
      <Stack.Navigator
        initialRouteName="LoginScreen"
        initialRouteName="Drawer Nav"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="LoginScreen" component={Login} />
        <Stack.Screen name="Drawer Nav" component={DrawerNav}/>

        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPassword} />
        <Stack.Screen name="HomeScreen" component={Home} />

        <Stack.Screen name="ProjectScreen" component={ProjectTarget} />
        <Stack.Screen name="AddProjectScreen" component={AddProjectTarget} />
        <Stack.Screen
          name="ClientAgreementMasterScreen"
          component={ClientAgreementMaster}
        />
        <Stack.Screen
          name="AddClientAgreementScreen"
          component={AddClientAgreement}
        />
        <Stack.Screen name="AccountMasterScreen" component={AccountMaster} />
        <Stack.Screen name="AddAccountantScreen" component={AddAccountant} />
        <Stack.Screen
          name="TechnologyMasterScreen"
          component={TechnologyMaster}
        />
        <Stack.Screen name="AddTechnologyScreen" component={AddTechnology} />

        <Stack.Screen name="Invoice History" component={InvoiceHistory} />
        <Stack.Screen name="Compare Report" component={CompareReport} />
        <Stack.Screen name="Resource Master" component={ResourcesMaster} />
        <Stack.Screen name="Add Resource" component={AddResource} />
        <Stack.Screen
          name="External Resources Master"
          component={ExternalResourcesMaster}
        />
        <Stack.Screen
          name="Add External Resource"
          component={AddExternalResource}
        />
        <Stack.Screen
          name="External Product Master"
          component={ExternalProductMaster}
        />
        <Stack.Screen
          name="Add External Product"
          component={AddExternalProduct}
        />
        <Stack.Screen
          name="Purchase Order Master"
          component={PurchaseOrderMaster}
        />
        <Stack.Screen name="Add Purchase Order" component={AddPurchaseOrder} />
        <Stack.Screen name="Edit Screen" component={EditScreen} />
        <Stack.Screen name=" Vendor Master" component={Vendor} />
        <Stack.Screen name="AddVendor" component={AddVendor} />

        <Stack.Screen name=" User Setting" component={UserSetting} />
        <Stack.Screen name="Client Request" component={ClientRequest} />
        <Stack.Screen name="Edit Technology" component={EditTechnology} />
        <Stack.Screen name="Edit ExternalProduct" component={EditExternalProduct} />
        <Stack.Screen name="Edit Purchase Order" component={EditPurchaseOrder} />
        <Stack.Screen name="Edit Project Target" component={EditProjectTarget} />
        <Stack.Screen name="Edit Client Agreenent" component={EditClientAgreement} />

        <Stack.Screen name="Edit External Resource" component={EditExternalResource} />
        <Stack.Screen name="Edit Resource" component={EditResource} />
        <Stack.Screen name="Edit Vendor" component={EditVendor} />
        <Stack.Screen name="Add UserSetting" component={AddUserSetting} />
        <Stack.Screen name="Edit UserSetting" component={EditUserSetting} />
        <Stack.Screen name="UpdateModal" component={UpdateModal} />
        <Stack.Screen name="Client Master" component={ClientMaster} />



      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

export default App;