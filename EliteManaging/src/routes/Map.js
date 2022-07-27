import React, {useEffect, useState} from 'react'
import './Businesses.css';
import axios from "axios";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import './Map.css';



function Map(stringAddress) {
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);

    axios.get('https://api.myptv.com/geocoding/v1/locations/by-text?searchText=' + stringAddress + '&apiKey=MWM3ZmI4Y2NmYWY4NDQ2NmIyNzVmYzUxMWM0OGRjNzA6NzM0ODhlMjctYjZkYy00OWU2LWIwODUtNzhiM2ZiODljZmI5', {
        method: "GET",
        headers: { apiKey: "MWM3ZmI4Y2NmYWY4NDQ2NmIyNzVmYzUxMWM0OGRjNzA6NzM0ODhlMjctYjZkYy00OWU2LWIwODUtNzhiM2ZiODljZmI5", "Content-Type": "application/json" }
    }).then(response => {
        console.log(response);
        setLongitude(response.data.locations[0].referencePosition.longitude);
        setLatitude(response.data.locations[0].referencePosition.latitude);
        console.log(`the long is ${longitude.valueOf()}`);
        console.log(`the lat is ${latitude.valueOf()}`);
    })


    const {isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCDW5FBqJbDGI1_dRr1VpEF_dDjkySZH04",
    });

    const center = {
        lat: latitude.valueOf(),
        lng: longitude.valueOf()
    }


    if(!isLoaded) return <div>Loading...</div>;
    return <Map />;

    function Map(){
        return (
            <GoogleMap
                zoom={10}
                center={center}
                mapContainerClassName="map-container">
                <Marker position={center} />
            </GoogleMap>
        );
    }
}

export default React.memo(Map);
