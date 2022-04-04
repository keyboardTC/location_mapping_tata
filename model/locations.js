
class Location {
    constructor(id = Math.random().toString(36).substr(2, 9) , title, address, lat, lng, createdDate = new Date().toUTCString(), updatedDate = new Date().toUTCString(), uid=Math.random().toString(36).substr(2, 9)){

        const current = new Date();
        const date = current.toDateString()

        this.uid = uid
        this.id = id;
        this.title = title;
        this.address = address;
        this.lat = lat; // { lat and long}
        this.lng = lng;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }
    
    toString() {
        return this.id + ', ' + this.title + ', ' + this.address + ', ' + this.createdDate + ', ' + this.createdDate;
    }
}

export default Location;