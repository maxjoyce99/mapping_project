import { useEffect} from 'react';
import Login from '../components/LoginForm';
import useToken from "../hooks/useToken";
import NewUser from '../components/NewUserForm';
import { useState } from 'react';


const Home = () => {

    return (
            <div className="home">

                  <p>THIS IS THE HOMEPAGE</p> 
                  <p> explain website and provide screenshot + link to my map</p>
            </div>
        )
    

}

export default Home;