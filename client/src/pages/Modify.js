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

    const addPicTest = () => {
        imagePaths.push = "http://localhost:3001/uploads/uploads/62e06252da9301516e7ba666/1658872402410capita_parkv1.jpg"
    }

    if(!loading){
        return (
            <div className="modifyPage">
            <ModifyLocation name = {location.state.name} id = {location.state.id} place = {location.state.place} updateName={handleNameUpdate} updateImage={handleImageUpdate}/>
                
                    <h3 >Modify the location: {name}</h3>  
                    <div className="pictures" prop={imagePaths}>
                    {imagePaths && imagePaths.map((path) => (
                            
                            <img key={path} src={path} alt = "icons" width="100%"></img>
                        ))
                    }
                    </div>
                    <button onClick={addPicTest}>Add PIC TEST</button>
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