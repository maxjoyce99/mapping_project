import { useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";
import { useFriendsContext } from "../hooks/useFriendsContext";

const PendingUser = (props) => {
    const {pending, friends, dispatchFriend} = useFriendsContext();
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
          body: JSON.stringify({"userRequesting": props.username,
                                "currentUserId": token._id})
        });

        const json = await response.json();
        console.log(json)

        if(response.ok){
            console.log("Found the user " + json);
            dispatchFriend({type: 'ADD_FRIEND', payload: json})
            //setFriendResponse("Adding " + json.username + " to your friends list!");
        }
        else{
            console.log("No user found");
            //setFriendResponse("The user " + userName + " was not found.");
        }

        const response2 = await fetch('/api/users/removePending', {
            method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({"nameToDelete": props.username,
                                    "currentUserId": token._id})
            });

            const json2 = await response2.json();

            console.log(json2);

            if(response2.ok){
                console.log("Deleted From pending list");
                console.log(props.username + props.id)
                dispatchFriend({type: 'DELETE_PENDING', payload: json2})
                //setFriendResponse("Adding " + json.username + " to your friends list!");
            }
            else{
                console.log("Couldn't delete from pending list");
                //setFriendResponse("The user " + userName + " was not found.");
            }

    }

    

    return (
    <div>
        <p>{props.username}</p>
        <p>{props.id}</p>
        <button className="formButtons" onClick={addFriend} > Add as Friend</button>
    </div>
    
)

}

export default PendingUser;