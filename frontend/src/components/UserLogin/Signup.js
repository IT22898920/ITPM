import React, { useState } from 'react';
import './Signup.css'; // Import shared CSS styles
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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
        const signUpData = { firstName, lastName, username, password }
        e.preventDefault();
            axios
            .post("http://localhost:8070/api/auth/register", signUpData)
            .then((res) => {
            console.log(res)
                showAlert("User Signed Up Successfully!", "success");
                navigate('/login');
            })
            .catch((error) => {
            console.error("Failed to register user!", error);
            showAlert("Failed to register user!", "error");
        });
    }
    

  return (
    <div className="signUpcard">
      <div className="signUpcard-content">
        <h2 className="auth-heading">Sign Up</h2>
        <form onSubmit={handleSubmit}>
        <div>
            <label className="signUplabel">FIRST NAME</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div><br/>
          <div>
            <label className="signUplabel">LAST NAME</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div><br/>
          <div>
            <label className="signUplabel">USERNAME</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div><br/>
          <div>
            <label className="signUplabel">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div><br/>
          <button className="signUpbutton" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};
