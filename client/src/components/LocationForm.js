import { useState } from 'react';
import { useLocationsContext } from '../hooks/useLocationsContext';

const LocationForm = () => {
    const { dispatch } = useLocationsContext();
    const [name,setName] = useState('');
    const [error,setError] = useState(null);
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [files, setFiles] = useState();
    //trying to make it an array

    const handleSubmit = async (e) => {
        e.preventDefault();
        var place = [];
        console.log("Lat:" + lat + " Long: " + long);
        place = [lat,long];
        console.log(place);
        
        const location = { name, place};

        const response = await fetch('/api/locations', {
            method: 'POST',
            body: JSON.stringify(location),
            headers: {
                'Content-Type': 'application/json'
            }

        })

        const json = await response.json()

        if(!response.ok){
            setError(json.err.message);
            console.log(json.err.message);
        }
        if(response.ok){
            setName('');
            place =[];
            setLat(''); 
            setLong(''); 
            setError(null);
            console.log("New Location Added", json);
            dispatch({type: 'CREATE_LOCATION', payload: json});
            fileSubmittedHandler(json._id);
        }
    }

    const fileSelectedHandler = async (event) => {
        event.preventDefault();
        setFiles(event.target.files);
        
    }

    const fileSubmittedHandler = async (id) => {
        console.log(files);
        const formData = new FormData();
        if(files){
            for (let i = 0; i < files.length; i++) {
                formData.append("images", files[i]);
            }
            console.log(formData);
        }

        const routePath = '/api/pictures/' + id; //adds id to the route path
        const response = await fetch(routePath, {
            method: 'POST',
            body: formData,
        })

        const json = await response.json();

        if(!response.ok){
            setError(json.err);
            console.log(json.err);
        }
        if(response.ok){
            setError(null);
            console.log("New Picture(s) Added", json);
            
        }


    }

    return(
        <>
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new location: </h3>


            <label>Location Name: </label>
            <input
                type="text"
                onChange={((e) => setName(e.target.value))}
                value={name}
            />

            <label>Location Latitude: </label>
            <input
                type="text"
                onChange={((e) => setLat(e.target.value))}
                value={lat}
            />

            <label>Location Longitude: </label>
            <input
                type="text"
                onChange={((e) => setLong(e.target.value))}
                value={long}
            />
            

            <input
            type="file"
            onChange={fileSelectedHandler}
            name="images"
            multiple="yes"
            />

            <button>Add Files</button>
        </form>
        {error && <div className="error">{error}</div>}
        </>
    )
}

export default LocationForm;