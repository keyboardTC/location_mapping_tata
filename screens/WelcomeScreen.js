import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Custom_ui/CButton';
import LocationList from '../components/Locations/LocationList';
import LoadingOverlay from '../components/Custom_ui/LoadingOverlay';
import { getLocations } from '../components/Auth/firebase/Crud';
import { LocationsContext } from '../context/locations-context';
import { AuthContext } from '../context/auth-context';


function WelcomeScreen({navigation, route}) {
  const [isloaded, setIsloaded] = useState(false);
  const [allLoc, setAllLoc] = useState([]);
  const allLocationCtx = useContext(LocationsContext);
  const authCtx = useContext(AuthContext);
  // let uid = authCtx.uid;

    useEffect(() => {
      (async () => {
        allLocationCtx.locs = []
        setIsloaded(true);
          const allLocatons = await getLocations(authCtx.uid);
          for (var value of allLocatons) {
            setAllLoc((currentLocs) => [...currentLocs, value]);
            if (allLocationCtx.locs.length === 0){
              allLocationCtx.locs.push(value);
            }else{
              if(!allLocationCtx.locs.some((locationCtx) => locationCtx.id === value.id)){
                allLocationCtx.locs.push(value);
                console.log("Object doesn't exist")
              } else{
                console.log("Object exist");
              }
            }
            console.log(`all post => ${value.id}`);
          };
          // allLocationCtx.addLocation({...allLoc});
          console.log(`allLoc new post => ${{...allLoc}}`);
          console.log(`all new postCtx => ${allLocationCtx.locs}`);
        setIsloaded(false);
      })();
    }, [allLocationCtx, getLocations]);

    if (isloaded) {
      console.log("locations are loading");
      return <LoadingOverlay message='Loading...'/>
    }


  const addHandler = ()=>{
    navigation.navigate("LocationDetails");
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.btn_addContainer}>
        <Button onPress={addHandler}>Add Location</Button>
      </View>
      <View style={styles.listContainer}>
        <LocationList />
      </View>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  btn_addContainer: {
    height:50,
    width: '100%',
    // backgroundColor: 'blue',
    alignItems:'flex-end' 
  },
  listContainer:{
    // backgroundColor: "#ccc",
    width: '100%'
  },
});