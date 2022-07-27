import { useState } from 'react';
import { useLocationsContext } from '../hooks/useLocationsContext';

const ModifyLocation = (props) => {
    const { dispatch } = useLocationsContext();
    const [name,setName] = useState('');
    const [error,setError] = useState(null);
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [files, setFiles] = useState();
    const [fileError, setFileError] = useState(null);
    const [submitted,setSubmitted] = useState(false);
    const[lastFocused,setLastFocused] = useState(null);

    /*const fileSubmittedHandler = async (id) => {
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
    }*/
    

    const handleFocus = (e) => {
        setLastFocused(e.target.className);
    }

    const changeLocationName = async (e) => {
        e.preventDefault();
        if(name.length > 0){
        console.log("Changing Location Name");

        /*const response = await fetch('/api/locations', {
            method: 'PATCH',
            body: e.target.value,
            headers: {
                'Content-Type': 'application/json'
            }

        });*/


        }
        else{
        setLastFocused("nameInput");
        }
    }

    return(
        <div className="create">
        <form className="createForm">
            <h3>Modify this location: </h3>
            <p>Current Name: {props.name} </p>
            <p>Current Coordinates: [{props.place[0]},{props.place[1]}] </p>
        
        <form>
            <label>New Location Name:</label>
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
            <button className="formButtons" onClick={changeLocationName}>Change Location Name</button>

            <span className="nameErrorSpan">Name should be 1-30 characters with no special characters.</span>
            {error && <span className="submitError">{error}</span>}
        </form>
        <form>
            <label>New Location Latitude: </label>
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
            <button className="formButtons">Change Location Latitude</button>
            <span className="latErrorSpan">Latitude must be a number between -90 and 90. Do not use N or S designation."</span>
        </form>
        <form>
            <label>New Location Longitude: </label>
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
            <button className="formButtons">Change Location Longitude</button>
            <span className="longErrorSpan">Longitude must be a number between -180 and 180. Do not use E or W designation.</span>
        </form>
            

            
        </form>

        

        <label>Add more pictures: </label>
            <input
            type="file"
            onChange={((e) => setFiles(e.target.files))}
            name="images"
            multiple="yes"
            className="formButtons"
            accept=".png, .jpg, .jpeg, .gif"
            />
        <button className="formButtons">Add Pictures</button>

            <p>Accepted file extensions include png, jpg, jpeg, and gif.</p>
        
        
        </div>
    )
}

export default ModifyLocation;