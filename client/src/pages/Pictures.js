import { useEffect} from 'react';
import { useLocationsContext } from '../hooks/useLocationsContext';

//components
import LocationDetails from '../components/LocationDetails';
import LocationForm from '../components/LocationForm';


const Pictures = () => {
    const {locations, dispatch} = useLocationsContext();
    console.log(locations);


    return (
            <div className="home">
                
                  <p>Pictures Page</p> 
                
                   
                
            </div>
        )
            

}

export default Pictures;