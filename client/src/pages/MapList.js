import { useEffect, useState} from 'react';
import UserDetails from '../components/UserDetails';
import useToken from '../hooks/useToken';

const MapList = () => {
    const [userList, setUserList] = useState([]);
    const {token, setToken} = useToken();
    const [userName, setUserName] = useState();
    const [friendResponse, setFriendResponse] = useState();
    //console.log("Map List Page");

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/login/userlist')
            const json = await response.json();
            
            if(response.ok) {
                
                for( var i = 0; i< json.length; i++){
                    if(json[i]._id===token?._id){
                        json.splice(i,1);
                    }
                }
                setUserList(json);
            }
            else{
                console.log("Users could not be found.");
            }
        }

        
        fetchUsers();
    },[]);

    const nameSubmitted = async (e) => {
        e.preventDefault()
        console.log(userName);

        const response = await fetch('/api/login/singleuser', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"username": userName})
        });

        const json = await response.json();

        if(response.ok){
            console.log("Found the user");
            console.log(json.user);
            setFriendResponse("Adding " + json.user.username + " to your friends list!");
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