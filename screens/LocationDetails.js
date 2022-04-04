import { StyleSheet, Text, View } from 'react-native'
import LocationForm from '../components/Locations/LocationForm'
import React, { useEffect, useLayoutEffect, useState, useContext } from 'react'
import IconButton from '../components/Custom_ui/IconButton'
import { deleteLocations } from '../components/Auth/firebase/Crud'
import { LocationsContext } from '../context/locations-context'
import LoadingOverlay from '../components/Custom_ui/LoadingOverlay'

const LocationDetails = ({navigation, route}) => {
    const [isadded, setIsAdded] = useState(false);
    const delLocationCtx = useContext(LocationsContext);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton  icon="trash" color="white" size={24} onPress={headerButtonPressHandler}/>
            },
            title: 'Location Details'
        });
    }, [navigation, headerButtonPressHandler])

    const itemData = route.params?.locInfo
    // const {id, title, address, createdDate, updatedDate, lat, lng} = route.params.locInfo
     async function headerButtonPressHandler(){
        console.log("Delete button pressed");

        setIsAdded(true);
        if (itemData?.id) {
          await deleteLocations(itemData?.id)
          console.log(" Deleted ***** ")
        }else{
            console.log(" Delete click***** ")
        }
        delLocationCtx.toggleChange();

        setIsAdded(false);
    }

    if (isadded) {
        console.log("add clicked")
        return <LoadingOverlay message='Loading...'/>
    }

  return (
    <LocationForm 
        id={itemData?.id} title={itemData?.title} address={itemData?.address} createdDate={itemData?.createdDate} updatedDate={itemData?.updatedDate} lat={itemData?.lat} lng={itemData?.lng}
    />
  )
}

export default LocationDetails

const styles = StyleSheet.create({})