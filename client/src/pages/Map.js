
import { useLocationsContext } from '../hooks/useLocationsContext';
import { useState, useEffect } from 'react';

//components
import LocationDetails from '../components/LocationDetails';
import LocationForm from '../components/LocationForm';

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
                //console.log("Response not okay");
            }


        }

        fetchLocations();
        


    },[]);

    console.log(locations);
    var coordinates = [
      
          [46.9233,-121.4760],
          [40.758701, -111.876183],
          [42.271389, -71.798889]
      
    ]

    //if(!loading){
    return (
            <div className="home">
                <div className="locations">
                    {locations && locations.map((location) => (
                        
                        <LocationDetails key={location._id} location={location} />
                    ))
                    
                    
                    }

                    {
                    locations && locations.map((location) => (
                        
                        <p key={location._id}>{location.place[0]},  {location.place[1]}</p>
                    ))
                    
                    
                    }
                </div>
                <MapContainer className="map" center={centerPosition} zoom={3.5} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {
 
            locations && locations.map((location) => (
                        <LocationMarker key={location._id} coord={location.place}/>
                    ))
                    
                    
                  }
            
            {//coordinates.map((coord)=><LocationMarker coord={coord}></LocationMarker>)
            }
            </MapContainer>

            
    
                
            </div>
        )
                 /* }
                  else {
                    return (
                      <p>Loading...</p>
                    )
                  }*/

}

export default Map;
