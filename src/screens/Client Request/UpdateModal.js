import React,{useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  TextInput,
  Dimensions
} from 'react-native';
import ErrorBox from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
const {height,width}=Dimensions.get('window')
const UpdateModal = () => {
  const [modalVisible, setModalVisible] = useState(true);
    console.log("I AM HERE")
    return(
    <SafeAreaView>
      <Modal animationType='fade' transparent={true} 
                          visible={modalVisible}
                          onRequestClose={()=>{
                            Alert.alert("modal closed")
                            setModalVisible(!modalVisible)}}> 
                           <View styte={styles.viewContainerView}>
                             <View style={styles.modalView}>
                             <ErrorBox   style={styles.iconStyle}
                                name={'alert-box-outline'}
                                size={80}
                                color="red"/>
                                <Text style={styles.titleText}> Are you sure?</Text>
                                <View>
                                <Text style={styles.subTitleText}>You won't be able to revert this!</Text>
                               <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                             <TouchableOpacity style={styles.addButton} >
              <Text style={styles.addButtonText}>  Add  </Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.updateButton}> 
              <Text style={styles.updateButtonText}>Update</Text>
                          </TouchableOpacity>
                           <TouchableOpacity style={styles.cancelButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
                          </TouchableOpacity>
                          </View >
                          <View style={styles.updateTextView}> 
                                <Text style={styles.updateText}>Update Client</Text>
                                </View>
                             <View style={styles.dropdownView}>
                             <TextInput placeholder="Previous Client" style={styles.textInput} />
                          
                             <TouchableOpacity>
           <Icon name="angle-down" size={20} style={styles.iconStyledrop} />
           </TouchableOpacity>
                          </View>
                          <TouchableOpacity style={styles.updateBtn} onPress={()=>setModalVisible(!modalVisible)}>
                                 <Text style={styles.updateBtnText}>Update</Text>
                               </TouchableOpacity>
                               
                      </View>
                      </View>
                      </View>
                         </Modal>                  
                              </SafeAreaView>
    )
                              
}
   const styles=StyleSheet.create({
    viewContainerView:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
     
    },
    addButton:{
      backgroundColor:"green",
    borderRadius:10,
    padding:'5%',
    margin:'6%',
    position:'relative',
    top:10,
    width:width/3.5,
    left:10
    
  },
  addButtonText:{
    fontSize:17,
    alignSelf:'center',
    fontWeight:'bold',
    padding:1,
    color:'white'
  },

  updateButton:{
    backgroundColor:"orange",
    borderRadius:10,
    padding:'5%',
    margin:'6%',
    position:'relative',
    top:10,
    width:width/3.5
    
  },
  updateButtonText:{
    alignSelf:'center',
    fontWeight:'bold',
    color:'white',
    fontSize:17,
    color:'white'
  },
  
   cancelButton:{
    backgroundColor:"grey",
    borderRadius:10,
    padding:'5%',
    margin:'6%',
    position:'relative',
     top:10,
     width:width/3.5,
     right:10
  },
  cancelButtonText:{
    fontSize:17,
    alignSelf:'center',
    fontWeight:'bold',
    color:'white'
  },
  updateTextView:{
    position:'relative',
    top:10
  },
   updateText:{
    alignSelf:'center',
    fontSize:18,
    fontWeight:'bold',

  },
  updateBtn:{
    
    backgroundColor:"orange",
    borderRadius:10,
    margin:'5%',
    padding:'5%',
    marginTop:5,
    marginLeft:10,
    width:width/1.1
    
   
  },
  updateBtnText:{
   fontSize:17,
   fontWeight:'bold',
   alignSelf:'center',
   justifyContent:'center',
  
  },
    dropdownView:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop:30,
      marginStart: '3%',
      borderWidth:2,
      borderColor:'lightgrey',
      borderRadius:10,
      padding:8,
      margin:10
    },
    textInput:{  
         fontSize:16     
    },
    iconStyledrop:{
     marginLeft:'10%',
     marginTop:12
      },
   
    titleText:{
      fontSize:17,
      fontWeight:'bold',
      alignSelf:'center',
      margin:10,
      marginTop:20
    },
    subTitleText:{
      fontSize:17,
      alignSelf:'center'
    },
   
    iconStyle:{
 
alignSelf:'center'
  
    },
  
    modalView:{
      width:width-20,
      backgroundColor: "white",
      borderRadius: 10,
      alignSelf:'center',
      marginTop:width/3,
      height:height/1.5
    },
   
  })
   export default UpdateModal