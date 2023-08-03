import { useEffect, useState} from 'react';
import UserDetails from '../components/UserDetails';
import useToken from '../hooks/useToken';
import PendingUser from '../components/PendingUser';
import { useFriendsContext } from '../hooks/useFriendsContext';

const MapList = (props) => {
    const {friends, pending, dispatchFriend} = useFriendsContext();
    const {token, setToken} = useToken();
    const [userName, setUserName] = useState();
    const [friendResponse, setFriendResponse] = useState();
    //console.log("Map List Page");

    useEffect(() => {
        
        const fetchFriends = async () => {
            const routePath = '/api/users/friendslist/' + token._id;

            const response = await fetch(routePath);
            
            const json = await response.json();
            
            if(response.ok) { 
                dispatchFriend({type: 'SET_FRIENDS', payload: json});
                console.log(friends);
            }
            else{
                console.log("Users could not be found.");
            }
        }

        const fetchPending = async () => {
            const routePath = '/api/users/pendinglist/' + token._id;

            const response = await fetch(routePath);
            
            const json = await response.json();
            
            if(response.ok) {
                
                dispatchFriend({type: 'SET_PENDING', payload: json})
                console.log(pending);
            }
            else{
                console.log("Users could not be found.");
            }
        }

        if(token._id !== 'NOUSER'){

        fetchFriends();
        fetchPending();
        console.log(friends);
        }

        

    },[]);

    const nameSubmitted = async (e) => {
        e.preventDefault()
        const response = await fetch('/api/users/requestuser', {
        method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"username": userName,
        "userId": token._id})
        });

        const json = await response.json();

        if(response.ok){
            console.log("Found the user");
            setFriendResponse("Adding " + json.username + " to your friends list!");
        }
        else{
            console.log("No user found");
            setFriendResponse("The user " + userName + " was not found.");
        }
    }

    if(token._id !== 'NOUSER'){

        return (
            <div>
                <form className="newFriendForm" onSubmit={nameSubmitted}>
                <h3> Add a friend</h3>
                <label>Username</label>
                <input placeholder='Username' onChange={e => setUserName(e.target.value)}/>
                <button className = "formButtons">Add a Friend </button>
                </form>
                {friendResponse && <span className="userfoundSpan">{friendResponse}</span>}

                <div className = "pendinglist">
                <p>Pending List</p>

                {pending && pending.map((user)=> (

                <PendingUser key={user.username} username={user.username} id={user._id}></PendingUser>

                ))}
                </div>

                <div className = "friendslist">
                <p> Friends List</p>

                {friends && friends.map((user)=> (

                <UserDetails key={user.username} username={user.username} id={user._id}></UserDetails>

                )) }
                </div>


            </div>
        )
    }
    else{
        return (
            <p>Make an account or log in to add friends!</p>
        )
    }


}

export default MapList;