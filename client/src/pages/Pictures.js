import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import { useImageContext } from '../hooks/useImageContext';
import useToken from "../hooks/useToken";
import { useNavigate } from 'react-router-dom';


const Pictures = () => {
    const {imagePaths, dispatchImage} = useImageContext();
    const [loading,setLoading] = useState(true);
    const {token, setToken } = useToken();
    const [pics, setPics] = useState(false);
    const [ownership, setOwnership] = useState(false); 

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFolder = async () => {
            const fetchUrl = '/api/pictures/' + location.state.userId  + "/" + location.state.id;
            const response = await fetch(fetchUrl);
            const json = await response.json();
            //set array to nothing first in case of multiple loads
            var imagePathsTemp = [];

            for(var i in json){
                var imagePathStart = "http://localhost:3001/uploads/" + location.state.userId  + "/" + location.state.id + "/"; //use path.join type thing???
                imagePathsTemp.push(imagePathStart + json[i]);
            }

            if(response.ok){
            setLoading(false);
            setPics(true);
            dispatchImage({type: 'SET_IMAGES', payload: imagePathsTemp});
            }

            if(response.status === "404"){
                console.log("PicturesNotFound");
                setLoading(false);
                setPics(false);
            }
        }

        fetchFolder();
        console.log(imagePaths[0]);
        if(token._id === location.state.userId){
            setOwnership(true);
        }
        
    },[]);

    const addPictures = async() => {
        console.log("Going to add pictures page");
        console.log(location.state.id);
        console.log(location.state.name);
        console.log(location.state.place);

        navigate("/modify", {state: {id: location.state.id, name: location.state.name, place: location.state.place, }});
    }

    console.log("Current User ID: " + token._id);
    console.log("User ID State: " + location.state.userId);
    console.log("Location state ID: " + location.state.id);

    if(!loading && !pics){
        return (
        
        <div>
        <p>There aren't any pictures for this location.</p>
        
        
        {ownership &&  <button onClick={addPictures}>Add some pictures</button>}
        </div>
        
        )
    }

    //only show edit pictures button if token._id = location.state.userId

    

    else if(!loading && pics){
        return (
                <div className="picturesPage">
                    
                    <h3>Pictures for Location: {location.state.name}</h3> 
                    {ownership && <button onClick={addPictures}>Edit Pictures</button>}
                    <div className="pictures">
                    {imagePaths && imagePaths.map((path) => (
                            
                            <img key={path} src={path} alt = "icons" width="100%"></img>
                        ))
                    }
                    </div>
                </div>
            )
        }
    else {
        return (
            <p>Loading Pictures...</p>
        )
    }
}

export default Pictures;