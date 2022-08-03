import { useEffect} from 'react';
import Login from '../components/LoginForm';
import useToken from "../hooks/useToken";

const Home = () => {
    const {token, setToken } = useToken();

    if(!token) {
        return <Login setToken={setToken} />
    }
    

    return (
            <div className="home">

                  <p>Max's Homepage</p> 
                  <Login setToken={setToken}></Login>
            </div>
        )

}

export default Home;