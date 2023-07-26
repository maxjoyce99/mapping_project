import { useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";

const PendingUser = (props) => {
    const navigate = useNavigate();
    const {token, setToken } = useToken();


    const addFriend = async(e) => {
        console.log("Adding this friend to eachothers friends list");

    }

    return (
    <div>
        <p>{props.username}</p>
        <button className="formButtons" onClick={addFriend} > Add as Friend</button>
    </div>
    
)

}

export default PendingUser;