import { db } from "./firebase_config";
import { doc, collection, setDoc, updateDoc , getDocs, deleteDoc, query, where } from "firebase/firestore";
import Location from "../../../model/locations";


// Firestore data converter
const locationConverter = {
    toFirestore: (location) => {
        return {
            id: location.id,
            title: location.title,
            address: location.address, 
            lat: location.lat, 
            lng: location.lng, 
            createdDate: location.createdDate, 
            updatedDate: location.updatedDate,
            uid: location.uid
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Location(data.id, data.title, data.address, data.lat, data.lng, data.createdDate, data.updatedDate, data.uid);
    }
};

export const addLocation = async ({...location}) => {
    console.log("testing spreed "+location.uid)
    const id = Math.random().toString(36).slice(2);
    // const ref = doc(collection(db, "locations")).withConverter(locationConverter);
    const ref = doc(db, "locations", id).withConverter(locationConverter);
    await setDoc(ref, new Location(id, location.enteredTitle, location.enteredAddress, location.enteredLat, location.enteredLong, undefined,undefined, location.uid));

    console.log(ref)
}

export const getLocations = async (uid) => {
    console.log("User test ID ===> "+uid);
    // const storedLocations = useContext(LocationsContext);
    // const ref = doc(collection(db, "locations"));
    // const querySnapshot = await getDocs(ref);
    // const querySnapshot = await getDocs(collection(db, "locations").withConverter(locationConverter));
    let allLocation = []
    const q = query(collection(db, "locations"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q.withConverter(locationConverter));
    querySnapshot.forEach((doc) => {
        allLocation.push(doc.data());
        console.log(doc.id, " => ", doc.data().address);
    });
    console.log("all =====> "+allLocation)
    return allLocation
}

export const updateLocations = async (id, title, lat, lng, address) => {
    const washingtonRef = doc(db, "locations", id);
    const updatedDate = new Date().toUTCString();

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
        title: title,
        lat:lat,
        lng:lng,
        address:address,
        updatedDate:updatedDate
    });
}

export const deleteLocations = async (id) => {
    
    await deleteDoc(doc(db, "locations", id));
}