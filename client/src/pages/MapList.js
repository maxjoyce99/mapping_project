import { useEffect, useState} from 'react';
import UserDetails from '../components/UserDetails';
import useToken from '../hooks/useToken';

const MapList = () => {
    const [userList, setUserList] = useState([]);
    const {token, setToken} = useToken();
    //console.log("Map List Page");

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/login/userlist')
            const json = await response.json();
            
            if(response.ok) {
                
                for( var i = 0; i< json.length; i++){
                    if(json[i]._id===token._id){
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


    return (
        <div>
        <p>Map List Page</p>
        
        {userList && userList.map((user)=> (

            <UserDetails username={user.username} id={user._id}></UserDetails>
            
        ))}
        </div>
    )
}

export default MapList;