import  {React, useState } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { login } from "../../firebase";
import { Link } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user_auth = async (event) => {
    event.preventDefault();
    try {
      await login( email, password);
    } catch (error) {
      console.error("Authentication error: ", error);
    }
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={user_auth}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to={'/signup'}>
        <p>Signup</p>
        </Link>
      </div>
    </div>
  );
}

export default Login;
