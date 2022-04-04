import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const LocationItem = ({id, title, address, createdDate, updatedDate, lat, lng}) => {

  // title, address, createdDate, updatedDate

  const navigation = useNavigation();

  const onSelect = ()=>{
    console.log("Locations selected : "+title);
    console.log("Lat and lng : "+lat+", "+lng);
    const loc = {
      id: id,
      title: title,
      address: address,
      createdDate: createdDate,
      updatedDate: updatedDate,
      lat: lat,
      lng: lng,
    }
    navigation.navigate("LocationDetails", { locInfo: loc });
  }

  return (
    <Pressable onPress={onSelect}>
        <View style={styles.itemContainer}>
          <View style={styles.titlebox}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
          <Text>Mapped Address: {address}</Text>
          <View>
            <Text>Created On:{createdDate}</Text>
            <Text>Update On:{updatedDate}</Text>
          </View>
        </View>        
    </Pressable>
  )
}

export default LocationItem

const styles = StyleSheet.create({
  itemContainer:{
    backgroundColor:'#ccc',
    borderWidth: 2,
    borderColor:'white',
    padding:10,
  },
  titleText:{
    fontWeight: 'bold',
    marginVertical:5,
  },
  titlebox:{
    alignItems: 'center',
  }
})