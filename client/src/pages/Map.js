
import { useLocationsContext } from '../hooks/useLocationsContext';
import { useState, useEffect } from 'react';
import { Tooltip } from 'react-leaflet';
import {useLocation} from 'react-router-dom';
import { useMap } from 'react-leaflet/hooks';
import { useMapEvents } from 'react-leaflet/hooks';
import { useMapEvent } from 'react-leaflet/hooks';
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';

//components
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import LocationMarker from  '../components/LocationMarker';
import useToken from '../hooks/useToken';

 
const Map = () => {
  const {locations, dispatch} = useLocationsContext();
  const [ loading, setLoading ] = useState(true);
  var centerPosition = [ 0, -0];
  const {token, setToken} = useToken();
  const [newLocation, setNewLocation] = useState();
  const markerRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  
  //console.log(location.state.userId);

  

    useEffect(() => {

        const fetchLocations = async () => {
            var mapId = '';
            if(!location.state.userId){
                mapId = token._id;
            }
            else{
                mapId = location.state.userId
            }
            const response = await fetch('/api/locations/getall/' + mapId);
            const json = await response.json();


            if(response.ok) {
                dispatch({type: 'SET_LOCATIONS', payload: json})
                setLoading(false);
                
            }
            else{
                console.log("Locations could not be found.");
            }

            console.log(mapId);
        }

        

        fetchLocations();
        


    },[]);

    

    function AddLocationComponent() {

          const map = useMapEvent('click', () => {
            console.log("Clicked")
            map.on("click", function (e) {
                console.log( e.latlng.lat + ", " + e.latlng.lng);
                const newLatLong = [e.latlng.lat, e.latlng.lng]
                setNewLocation(newLatLong);
                console.log(newLocation);
                const marker = markerRef.current;
                if (marker) {
                    marker.openPopup()
                    //marker.popup.popupclose(console.log("popup closed"))
                }
              }
            )
          })
    }

    console.log(locations);

    const newLocationClicked = (props) => {
        console.log("New Location Clicked : " + newLocation);
        
        navigate("/edit", {state: {newLocation: newLocation}});
    }

    const backToMap = (props) => {
        console.log("Back To Map");
        setNewLocation();
    }

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
                
                {
                    newLocation && newLocation.map((location, idx) => (
                        <Marker ref={markerRef} id="newLocationMarker" key={`marker-${idx}`} coord={newLocation} position={newLocation} >
                            <Popup openOn="map"id="newLocationPopup" visible='true'>
                                <button onClick={newLocationClicked}>Create a new location here</button>
                                <button onClick={backToMap}>Cancel</button>
                            </Popup>
                        </Marker>))

                }

                <AddLocationComponent />
                
            </MapContainer>

        </div>
    )

}

export default Map;
