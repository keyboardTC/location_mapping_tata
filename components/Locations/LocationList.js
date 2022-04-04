import { FlatList, StyleSheet, Text, View } from 'react-native'
import LocationItem from './LocationItem'
import { LocationsContext } from '../../context/locations-context'
import React, { useContext } from 'react'

const LocationList = ({locations}) => {

  const locationCtx = useContext(LocationsContext);

    if (!locationCtx.locs || locationCtx.locs.length === 0 ) {
        return <View>
            <Text>No Location saved</Text>
        </View>
    }

    const renderLocation = (itemData) => {
      const values = {
        title: itemData.item.title
      }
      return (
        <View style={styles.itemContainer}>
          <LocationItem id={itemData.item.id} title={itemData.item.title} address={itemData.item.address} createdDate={itemData.item.createdDate} updatedDate={itemData.item.updatedDate} lat={itemData.item.lat} lng={itemData.item.lng} />
        </View>
      )
    }

  return (
    <FlatList 
        data={locationCtx.locs} 
        keyExtractor={(item) => item.id} 
        renderItem = {renderLocation} 
    />
  )
}

export default LocationList

const styles = StyleSheet.create({
  itemContainer:{
    marginVertical:4,
  }
})