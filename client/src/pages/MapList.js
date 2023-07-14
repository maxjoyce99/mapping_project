import { useEffect, useState} from 'react';
import UserDetails from '../components/UserDetails';
import useToken from '../hooks/useToken';

const MapList = (props) => {
    const [userList, setUserList] = useState([]);
    const {token, setToken} = useToken();
    const [userName, setUserName] = useState();
    const [friendResponse, setFriendResponse] = useState();
    //console.log("Map List Page");

    useEffect(() => {
        
        const fetchFriends = async () => {
            const routePath = '/api/login/friendslist/' + token._id;

            const response = await fetch(routePath);
            
            const json = await response.json();
            
            if(response.ok) {
                
                setUserList(json);
                console.log(userList);
            }
            else{
                console.log("Users could not be found.");
            }
        }

        if(token._id !== 'NOUSER'){

        fetchFriends();
        }
    },[]);

    const nameSubmitted = async (e) => {
        e.preventDefault()
        const response = await fetch('/api/login/frienduser', {
        method: 'POST',
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

    return (
        <div>
            <form className="newFriendForm" onSubmit={nameSubmitted}>
            <h3> Add a friend</h3>
            <label>Username</label>
            <input placeholder='Username' onChange={e => setUserName(e.target.value)}/>
            <button className = "formButtons">Add a Friend </button>
            </form>
            {friendResponse && <span className="userfoundSpan">{friendResponse}</span>}
        <p>Map List Page</p>
        
        {userList && userList.map((user)=> (

            <UserDetails key={user.username} username={user.username} id={user._id}></UserDetails>
            
        ))}
        </div>
    )
}

export default MapList;