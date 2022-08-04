import PropTypes from 'prop-types';
import { useState } from 'react';

const NewUser = ({ setToken }) => {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = await registerUser({
          username,
          password,
          email
        });

        console.log(newUser);
        
    }

    const registerUser = async(newUser) => {
        const response = await fetch('/api/login/new' , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        });

        const json = await response.json();

        return json;
    }


    return(
      <div className="registerForm">
        <h1>Please Create a New Account</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" onChange={e => setUserName(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)} />
          </label>
          <label>
            <p>Email</p>
            <input type="text" onChange={e => setEmail(e.target.value)} />
          </label>
          <div>
            <button type="submit"> Register </button>
          </div>
        </form>
      </div>
    )
  }



  export default NewUser;