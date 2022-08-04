
import { useLocationsContext } from '../hooks/useLocationsContext';
import { useState, useEffect } from 'react';
import { Tooltip } from 'react-leaflet';

//components
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import LocationMarker from  '../components/LocationMarker';
import useToken from '../hooks/useToken';
 
const Map = () => {
  const {locations, dispatch} = useLocationsContext();
  const [ loading, setLoading ] = useState(true);
  var centerPosition = [ 38.500000,  -98.000000];
  const {token, setToken} = useToken();

    useEffect(() => {
        const fetchLocations = async () => {
            const response = await fetch('/api/locations/getall/' + token._id);
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
        <div key ="wholeMapDiv" className="map">

            <MapContainer key="mapContainer" className="map" center={centerPosition} zoom={3.5} scrollWheelZoom={true}>

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    key="openMapsLayer"
                />
                
                {locations && locations.map((location) => (
                    <LocationMarker key={"marker" + location._id} id={location._id} coord={location.place} name={location.name}/>))
                }
                
            </MapContainer>

        </div>
    )

}

export default Map;
