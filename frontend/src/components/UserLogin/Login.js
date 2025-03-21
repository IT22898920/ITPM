import React, {useState} from 'react';
import axios from 'axios';
import './Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import authService from '../services/authService';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
//   const history = useHistory();

  const showAlert = (message, type) => {
    const alertBox = document.createElement("div");
    alertBox.classList.add("custom-alert1", `custom-alert1-${type}`);
    alertBox.textContent = message;

    document.body.appendChild(alertBox);

    setTimeout(() => {
      alertBox.remove();
    }, 3000);
  };
  const handleSubmit = async (e) => {
    const loginData = { username, password }
    e.preventDefault();
      axios
      .post("http://localhost:8070/api/auth/login", loginData)
      .then((res) => {
        console.log(res)
          showAlert("User Logged In Successfully!", "success");
          localStorage.setItem("username", res.data.username)
          localStorage.setItem("userId", res.data.userId)
          localStorage.setItem("loginStatus", res.data.loginStatus)
          navigate("/addphase")
      })
      .catch((error) => {
        console.error("Invalid Credentials", error);
        showAlert("Invalid Credentials", "error");
      });
    }

  return (
    <div className="logincard">
      <div className="logincard-content">
        <h2 className="login-heading">LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="loginlabel">USERNAME</label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div><br/>
          <div>
            <label className="loginlabel">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="loginbutton" type="submit">Login</button><br/>
          <center><h5 style={{color:"white"}}>Not already a User? <b> <Link to="/signup" >Sign Up</Link></b></h5></center>
        </form>
      </div>
    </div>
  );
};