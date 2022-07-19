
import { useLocationsContext } from '../hooks/useLocationsContext';
import { useState, useEffect } from 'react';
import { Tooltip } from 'react-leaflet';

//components
import LocationDetails from '../components/LocationDetails';

import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import LocationMarker from  '../components/LocationMarker';
 
const Map = () => {
  const {locations, dispatch} = useLocationsContext();
  const [ loading, setLoading ] = useState(true);
  var centerPosition = [ 38.500000,  -98.000000];

    useEffect(() => {
        const fetchLocations = async () => {
            const response = await fetch('/api/locations');
            const json = await response.json();


            if(response.ok) {
                dispatch({type: 'SET_LOCATIONS', payload: json})
                setLoading(false);
                
            }
            else{
                console.log("Locations could not be found.");
            }


        }

        fetchLocations();
        


    },[]);

    console.log(locations);

    return (
        <div key ="wholeMpaDiv" className="map">
            <div key="locationdetails" className="locations">
                {locations && locations.map((location) => (  
                    <LocationDetails key={location._id} location={location} />))
                }

            </div>

            <MapContainer className="map" center={centerPosition} zoom={3.5} scrollWheelZoom={true}>

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {locations && locations.map((location) => (
                    <LocationMarker key={location._id} id={location._id} coord={location.place}/>))
                }
                
            </MapContainer>

        </div>
    )

}

export default Map;
