import { useEffect, useState } from 'react';
import { useLocationsContext } from '../hooks/useLocationsContext';


const Pictures = () => {
    const {locations, dispatch} = useLocationsContext();
    const [ image, setImage ] = useState(null);
    const [imagePaths, setImagePaths] = useState([]);
    const [loading,setLoading] = useState(true);

    /*const fetchImage = async () => {
        //"https://i.imgur.com/fHyEMsl.jpg"
        const response = await fetch('/api/pictures');
        const imageBlob = await response.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        console.log(imageObjectURL);
        console.log(response);

        if(response.ok) {
            setImage(imageObjectURL);
        }

    }*/
    
    useEffect(() => {
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
    },[]);

    if(!loading){
    return (
            <div className="pictures">
                
                  <p>Pictures Page</p> 
                  
                {imagePaths && imagePaths.map((path) => (
                        
                        <img src={path} alt = "icons"></img>
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