import { useEffect} from 'react';
import Login from '../components/LoginForm';
import useToken from "../hooks/useToken";
import NewUser from '../components/NewUserForm';
import { useState } from 'react';

const Home = () => {
    const {token, setToken } = useToken();
    const [newUser, setNewUser] = useState(false);

    const handleNewUser = () => {
        setNewUser(!newUser);
    }

    if(!token) {
        if(newUser) {
            return (
                <>
            <NewUser></NewUser>
            <button onClick={handleNewUser}> Go Back to Login Page</button>
            </>
            )
        }
        else {
        return (
            <>
        <Login setToken={setToken} />
        <button onClick={handleNewUser}> Make a New Account</button>
        </>
        )
        }
    }
    if(token){

    return (
            <div className="home">

                  <p>Max's Homepage</p> 
                  <p> Logged in as user {token.username} </p>  
            </div>
        )
    }

}

export default Home;