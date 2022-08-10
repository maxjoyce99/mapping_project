import { useEffect, useState} from 'react';
import UserDetails from '../components/UserDetails';

const MapList = () => {
    const [userList, setUserList] = useState([]);


    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/login/userlist')
            const json = await response.json();

            if(response.ok) {
                setUserList(json);
            }
            else{
                console.log("Users could not be found.");
            }
        }

        
        fetchUsers();
    },[]);


    return (
        <div>
        <p>Map List Page</p>
        
        {userList &&userList.map((user)=> (
            <UserDetails username={user.username} id={user._id}></UserDetails>
        ))}
        </div>
    )
}

export default MapList;