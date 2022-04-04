import { createContext, useState } from "react";
import Location from "../model/locations";

export const LocationsContext = createContext({
    locs: [],
    addLocation: (id) => {},
    deleteLocaton: (id) => {},
    toggleChange: () => {},
    isChanged: false
})

function LocationsContextProvider({children}) {
    const [locs, setLocs] = useState([]);
    const [ishanged, setIsChanged] = useState(false);

    function addLocation(location) {
        setLocs((currentLocs) => [...currentLocs, location]);
    }

    function deleteLocation(location) {
        setLocs((currentLocs) => 
            currentLocs.filter((id) => id !== location.id)
        );
    }

    function toggleChange() {
        setIsChanged(!ishanged);
    }

    const value = {
        locs: locs,
        addLocation: addLocation,
        deleteLocaton: deleteLocation,
        toggleChange:toggleChange,
        isChanged: ishanged
    };

    return <LocationsContext.Provider value={value}>{children}</LocationsContext.Provider>
}

export default LocationsContextProvider