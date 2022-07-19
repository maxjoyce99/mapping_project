import { useEffect, useState } from 'react';
import { useLocationsContext } from '../hooks/useLocationsContext';
import {useLocation} from 'react-router-dom';


const Pictures = () => {
    const {locations, dispatch} = useLocationsContext();
    const [imagePaths, setImagePaths] = useState([]);
    const [loading,setLoading] = useState(true);

    const location = useLocation();
    console.log(location.state.id);
  


    /*useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch('/api/pictures');
            const json = await response.json();
            //set array to nothing first in case of multiple loads
            imagePaths.length=0;
            for(var i in json){
                var imagePathStart = "http://localhost:3001/uploads/"
                imagePaths.push(imagePathStart + json[i]);
            }
            setLoading(false);
            
        }

        fetchImages();
    },[]);*/

    useEffect(() => {
        const fetchFolder = async () => {
            const fetchUrl = '/api/pictures/' + location.state.id;
            const response = await fetch(fetchUrl);
            const json = await response.json();
            //set array to nothing first in case of multiple loads
            imagePaths.length=0;
            for(var i in json){
                var imagePathStart = "http://localhost:3001/uploads/" + location.state.id + "/"; //use path.join???
                imagePaths.push(imagePathStart + json[i]);
            }
            setLoading(false);
            
            
        }

        fetchFolder();
        console.log(imagePaths);
    },[]);

    if(!loading){
    return (
            <div className="pictures">
                
                  <p>Pictures Page</p> 

                {imagePaths && imagePaths.map((path) => (
                        
                        <img key={path} src={path} alt = "icons"></img>
                    ))
                }
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