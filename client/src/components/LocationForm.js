import { useState } from 'react';
import { useLocationsContext } from '../hooks/useLocationsContext';

const LocationForm = () => {
    const { dispatch } = useLocationsContext();
    const [name,setName] = useState('');
    const [error,setError] = useState(null);
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [files, setFiles] = useState();
    const [fileError, setFileError] = useState(null);
    const [submitted,setSubmitted] = useState(false);
    const[lastFocused,setLastFocused] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(error);
        setSubmitted(true);
        setLastFocused(null);
        var place = [];
        //console.log("Lat:" + lat + " Long: " + long);
        place = [lat,long];
        //console.log(place);
        
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
            setError(json.error);
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
            setFileError(json.err);
            setFiles(null);
            console.log(json.err);
        }
        if(response.ok){
            setFileError(null);
            console.log("New Picture(s) Added", json);
            
        }
    }
    

    const handleFocus = (e) => {
        setLastFocused(e.target.className);
    }

    return(
        <div className="create">
        <form className="createForm" onSubmit={handleSubmit}>
            <h3>Add a new location </h3>
 
            <label>Location Name: </label>
            <input
                className="nameInput"
                type="text"
                onChange={((e) => setName(e.target.value))}
                value={name || ''}
                placeholder="Name"
                required = {true}
                pattern = "^[A-Za-z0-9]{1,30}$"
                onBlur = {handleFocus}
                lastfocused={lastFocused}
            />
            <span className="nameErrorSpan">Name should be 1-30 characters with no special characters.</span>
            {error && <span className="submitError">{error}</span>}

            <label>Location Latitude: </label>
            <input
                className="latInput"
                type="number"
                onChange={((e) => setLat(e.target.value))}
                value={lat|| ''}
                placeholder="Latitude"
                required = {true}
                onBlur = {handleFocus}
                lastfocused={lastFocused}
                min = "-90"
                max = "90"
            />
            <span className="latErrorSpan">Latitude must be a number between -90 and 90. Do not use N or S designation."</span>

            <label>Location Longitude: </label>
            <input
                className="longInput"
                type="number"
                onChange={((e) => setLong(e.target.value))}
                value={long|| ''}
                placeholder="Longitude"
                required = {true}
                onBlur = {handleFocus}
                lastfocused={lastFocused}
                min = "-180"
                max = "180"
            />
            <span className="longErrorSpan">Longitude must be a number between -180 and 180. Do not use E or W designation.</span>

            <input
            type="file"
            onChange={((e) => setFiles(e.target.files))}
            name="images"
            multiple="yes"
            className="formButtons"
            accept=".png, .jpg, .jpeg, .gif"
            />

            <p>Accepted file extensions include png, jpg, jpeg, and gif.</p>

            
            <button className="formButtons">Add Location</button>
        </form>
        
        </div>
    )
}

export default LocationForm;