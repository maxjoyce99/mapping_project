import PropTypes from 'prop-types';
import { useState } from 'react';

const Login = ({ setToken }) => {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [error,setError] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        console.log(token);
        setToken(token);
    }

    const loginUser = async(credentials) => {
        const response = await fetch('/api/login/existing', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        });
        
        const json = await response.json();

        if(!response.ok){
          setError(json.error);
      }
      if(response.ok){

        return json;
      }
    }


    return(
      <div className="login-wrapper">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" placeholder="Username" onChange={e => setUserName(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          </label>

          {error && <span className="submitError">{error}</span>}

          <div>
            <button className="formButtons" type="submit"> Login </button>
          </div>
        </form>
      </div>
    )
  }

  Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }

  export default Login;