import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import { useImageContext } from '../hooks/useImageContext';


const Pictures = () => {
    const {imagePaths, dispatchImage} = useImageContext();
    const [loading,setLoading] = useState(true);

    const location = useLocation();

    useEffect(() => {
        const fetchFolder = async () => {
            const fetchUrl = '/api/pictures/' + location.state.id;
            const response = await fetch(fetchUrl);
            const json = await response.json();
            //set array to nothing first in case of multiple loads
            var imagePathsTemp = [];

            for(var i in json){
                var imagePathStart = "http://localhost:3001/uploads/" + location.state.id + "/"; //use path.join type thing???
                imagePathsTemp.push(imagePathStart + json[i]);
            }

            if(response.ok){
            setLoading(false);
            dispatchImage({type: 'SET_IMAGES', payload: imagePathsTemp});
            }
        }

        fetchFolder();
        console.log(imagePaths);
    },[]);

    if(!loading){
        return (
                <div className="picturesPage">
                    
                    <h3>Pictures for Location: {location.state.name}</h3> 
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