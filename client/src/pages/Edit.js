import { useEffect} from 'react';
import { useLocationsContext } from '../hooks/useLocationsContext';

//components
import LocationDetails from '../components/LocationDetails';
import LocationForm from '../components/LocationForm';


const Edit = () => {
    const {locations, dispatch} = useLocationsContext();

    useEffect(() => {
        const fetchLocations = async () => {
            const response = await fetch('/api/locations');
            const json = await response.json();


            if(response.ok) {
                dispatch({type: 'SET_LOCATIONS', payload: json})
            }
            else{
                console.log("Locations could not be found.");
            }
        }

        fetchLocations();


    },[]);

    //console.log(locations);


    return (
            <div className="home">
                <div className="locations">
                    {locations && locations.map((location) => (
                        
                        <LocationDetails key={location._id} location={location} />
                    ))
                    
                    
                    }
                </div>
                <LocationForm />    
                
            </div>
        )
            

}

export default Edit;