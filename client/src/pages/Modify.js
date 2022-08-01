import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import ModifyLocation from '../components/ModifyLocation';


const Modify = () => {
    const [imagePaths, setImagePaths] = useState([]);
    const [loading,setLoading] = useState(true);
    const [name,setName] = useState("");
    const [imageUpdated,setImageUpdated] = useState(false);

    const location = useLocation();

    const handleNameUpdate = (newName) => {
        console.log("Updating Name");
        setName(newName);
    }

    const handleImageUpdate = () => {
        console.log("Updating Images");
        setImageUpdated(!imageUpdated);
    }

    const handleImageDelete = async(e) => {
        e.preventDefault();
        console.log("Deleting Image");
        const pathSplit = e.target.title.split("/");
        const path = pathSplit[pathSplit.length-1]
        console.log(path);

        const bodyObject = {
            "id" : location.state.id,
            "picturePath" : path
        }

        const response = await fetch('/api/pictures', {
            method: 'DELETE',
            body: JSON.stringify(bodyObject),
            headers: {
                'Content-Type': 'application/json'
            }

        })


    }

    useEffect(() => {
        console.log("Loading Pictures");
        const fetchFolder = async () => {
            const fetchUrl = '/api/pictures/' + location.state.id;
            const response = await fetch(fetchUrl);
            const json = await response.json();
            //set array to nothing first in case of multiple loads
            imagePaths.length=0;

            for(var i in json){
                var imagePathStart = "http://localhost:3001/uploads/" + location.state.id + "/"; //use path.join type thing???
                imagePaths.push(imagePathStart + json[i]);
            }

            if(response.ok){
            setLoading(false);
            }
        }

        fetchFolder();
        console.log(imagePaths);
        setName(location.state.name);
    },[imageUpdated]);

    if(!loading){
        return (
            <div className="modifyPage">
            <ModifyLocation name = {location.state.name} id = {location.state.id} place = {location.state.place} updateName={handleNameUpdate} updateImage={handleImageUpdate}/>
                
                    <h3 >Modify the location: {name}</h3>  
                    <div className="pictures" prop={imagePaths}>
                    {imagePaths && imagePaths.map((path) => (
                        <div>
                            <button key={path + "button"} className="deleteImage" title={path} onClick={handleImageDelete}>×</button>
                            <img key={path} className="images" src={path} alt = "icons"></img>
                        </div>
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

export default Modify;