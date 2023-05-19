import { useNavigate } from "react-router-dom";

const UserDetails = (props) => {
    const navigate = useNavigate();
    
    const handleMapClick = () => {
        navigate("/map", {state: {userId: props.id}});
    }

    return (
    <div>
        <p>{props.username}</p>
        <button  className ="formButtons" onClick={handleMapClick} >See their map!</button>
    </div>
    
)

}

export default UserDetails;