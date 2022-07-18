import { useEffect, useState } from 'react';
import { useLocationsContext } from '../hooks/useLocationsContext';


const Pictures = () => {
    const {locations, dispatch} = useLocationsContext();
    const [ image, setImage ] = useState(null);
    const [imagePaths, setImagePaths] = useState([]);

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
            
        }

        fetchImages();
    },[]);


    return (
            <div className="pictures">
                
                  <p>Pictures Page</p> 
                  
                <img src={"http://localhost:3001/uploads/1657816503325crystal2.jpg"} alt = "icons"></img>
                

                {imagePaths && imagePaths.map((path) => (
                        
                        <img src={path} alt = "icons"></img>
                    ))
                }
            </div>
        )
            

}

export default Pictures;