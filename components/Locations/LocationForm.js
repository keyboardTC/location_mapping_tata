import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import Button from '../Custom_ui/CButton'
import { addLocation, updateLocations } from '../Auth/firebase/Crud'
import LoadingOverlay from '../Custom_ui/LoadingOverlay'
import { LocationsContext } from '../../context/locations-context'
import { AuthContext } from '../../context/auth-context'
import { Alert } from 'react-native-web'



const LocationForm = ({id, title, address, createdDate, updatedDate, lat, lng}) => {

  useEffect(() => {
    if (id) {
      setEnteredId(id)
      setEnteredTitle(title)
      setEnteredLat(lat)
      setEnteredLong(lng)
      setEnteredAddress(address)
    }
  }, []); 

  const current = new Date();
  const date = current.toDateString()

  const [isadded, setIsAdded] = useState(false);
  const [enteredId, setEnteredId] = useState('');
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredLat, setEnteredLat] = useState('');
  const [enteredLong, setEnteredLong] = useState('');
  const [enteredAddress, setEnteredAddress] = useState('');
  const newLocationCtx = useContext(LocationsContext);
  const authCtx = useContext(AuthContext);

  let uid = authCtx.uid;
  const titleChangeHandler = (enteredText)=>{
    setEnteredTitle(enteredText.trim());
  }
  const addressChangeHandler = (enteredText)=>{
    setEnteredAddress(enteredText.trim());
  }
  const latChangeHandler = (enteredText)=>{
    setEnteredLat(enteredText.trim());
  }
  const longChangeHandler = (enteredText)=>{
    setEnteredLong(enteredText.trim());
  }

  async function addLocationHandler(){
     setIsAdded(true);
     if (id) {
       await updateLocations(id, enteredTitle, enteredLat, enteredLong, enteredAddress)
       console.log(" updated ***** ")
     }else{
       if (!enteredTitle || !enteredLat || !enteredLong || !enteredAddress) {
         Alert.alert('Please Fill in all inputs');
       }else{
        await addLocation({enteredTitle, enteredLat, enteredLong, enteredAddress, uid});
       }
     }

     newLocationCtx.toggleChange();
     setIsAdded(false);
  }

  if (isadded) {
    console.log("add clicked")
    return <LoadingOverlay message='Loading...'/>
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Title</Text>
        <TextInput onChangeText={titleChangeHandler} value={enteredTitle} style={styles.inputStyle} placeholder="Enter Title" />
      </View>
      <View>
      <View style={styles.mapPickerContainer}>
        <Text style={styles.title}>Location Co-ordinate</Text>
        <TextInput onChangeText={latChangeHandler} value={enteredLat} style={styles.inputStyle} placeholder="Enter lat" />
        <TextInput onChangeText={longChangeHandler} value={enteredLong} style={styles.inputStyle} placeholder="Enter long" />
        <TextInput onChangeText={addressChangeHandler} value={enteredAddress} style={styles.inputStyle} placeholder="Enter Address" />
      </View>
      <View style={styles.datesContainer}>
        <Text style={styles.dateText}>Created At: {createdDate}</Text>
        <Text>=====</Text>
        <Text style={styles.dateText}>Update At: {updatedDate}</Text>
      </View>
      <View>
          <Button onPress={addLocationHandler}>SAVE</Button>
      </View>
      </View>
    </View>
  )
}

export default LocationForm

const styles = StyleSheet.create({
  mainContainer:{
    padding:20
  },
  titleContainer: {
    width:"100%"
  },
  datesContainer:{
    // flexDirection:'row',
    alignContent: 'flex-end',
    justifyContent:"flex-end",
    marginBottom:20
  },
  inputStyle: {
    height: 40,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#c1016b',
    marginVertical: 10,
    borderRadius: 18,
    paddingHorizontal: 18,
    color:'#72063c',
    fontWeight: 'bold'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mapPickerContainer:{
    height: 380,
    width:"100%",
    backgroundColor:'#ccc',
    marginVertical: 20,
    justifyContent:'center',
    alignContent: 'center',
    padding:20,
    // columnGap: 20,
  },
  dateText:{
    fontSize:12,
  },
})