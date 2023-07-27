import { useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";

const PendingUser = (props) => {
    const navigate = useNavigate();
    const {token, setToken } = useToken();
    


    const addFriend = async(e) => {
        console.log("Adding this friend to eachothers friends list");
        e.preventDefault()
        const response = await fetch('/api/users/frienduser', {
        method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"userRequesting": props.userName,
                                "currentUserId": token._id})
        });

        const json = await response.json();

        if(response.ok){
            console.log("Found the user");
            //setFriendResponse("Adding " + json.username + " to your friends list!");
        }
        else{
            console.log("No user found");
            //setFriendResponse("The user " + userName + " was not found.");
        }
    }

    

    return (
    <div>
        <p>{props.username}</p>
        <button className="formButtons" onClick={addFriend} > Add as Friend</button>
    </div>
    
)

}

export default PendingUser;