import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Phasebook.css";
import Header from "../../Header/Navbar";
import { useNavigate } from "react-router-dom";

const AddPhase = () => {
  const [userId, setUserId] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get the user ID from local storage
    const storedUserId = localStorage.getItem("userId");

    // If user ID exists in local storage, set it in the state
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      navigate('/login')
    }
  }, []);

  const showAlert = (message, type) => {
    const alertBox = document.createElement("div");
    alertBox.classList.add("custom-alert1", `custom-alert1-${type}`);
    alertBox.textContent = message;

    document.body.appendChild(alertBox);

    setTimeout(() => {
      alertBox.remove();
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "description") {
      setDescription(value);
    } else if (name === "note") {
      setNote(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (description.trim() === "") {
      showAlert("Please enter a note heading", "error");
      return;
    }

    const data = {
      userId,
      description,
      note,
    };

    axios
      .post("http://localhost:8070/post/save", data)
      .then((res) => {
        if (res.data.success) {
          showAlert("Note saved successfully", "success");
          setDescription("");
          setNote("");
        }
      })
      .catch((error) => {
        console.error("Please enter a note", error);
        showAlert("Please enter a note", "error");
      });
  };

  return (
    <div className="notepad-container">
      <Header />
      <Link to="/viewphasebook" className="back-btn">
        View Notes
      </Link>

      <h1 className="notepad-title">
        Phase
        <span style={{ color: "#368728", borderBottom: "2px solid #368728" }}>
          book
        </span>
      </h1>
      <form className="notepad-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Note Heading</label>
          
          <input
            type="text"
            className="form-control"
            name="description"
            placeholder="Enter Your Note Heading"
            value={description}
            onChange={handleInputChange}
          />
        </div>

        <label style={{ color: "#fff",  }}>
          Note Message
        </label>
        <div className="custom-textarea">
          <textarea
            name="note"
            placeholder="Enter Your Note Message  "
            value={note}
            onChange={handleInputChange}
            style={{ color: "black", fontSize: "16px" }}
          />
        </div>
        <br></br>
        <div className="text-center">
          &nbsp;&nbsp;
          <button className="btn btn-success" type="submit">
            <i className="far fa-check-square"></i>
            Save Note
          </button>
          <br></br>
        </div>
      </form>
    </div>
  );
};

export default AddPhase;
