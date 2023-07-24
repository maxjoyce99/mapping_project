import { useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";

const UserDetails = (props) => {
    const navigate = useNavigate();
    const {token, setToken } = useToken();


    const handleMapClick = () => {
        navigate("/map", {state: {userId: props.id}});
    }

    const handleUnfriend = async(e) => {
    
        const fetchUrl = '/api/users/deletefriend/' + token._id;
        console.log(fetchUrl);
                const response = await fetch(fetchUrl, {
                    method: 'PATCH',
                    body: JSON.stringify({'username': props.username}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                

        });

        const json = await response.json();

            if(!response.ok){
                console.log(json.error);
                
            }

            if(response.ok){
                console.log("Deleted that friend");
            }

    }

    return (
    <div>
        <p>{props.username}</p>
        <button  className ="formButtons" onClick={handleMapClick} >See their map!</button>
        <button className="formButtons" onClick={handleUnfriend} > Remove this friend</button>
    </div>
    
)

}

export default UserDetails;