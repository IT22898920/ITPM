import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './Phasebook.css';
import Header from "../../Header/Navbar";
const EditPhase = () => {
  const { id } = useParams();

  const [description, setDescription] = useState('');
  const [note, setNote] = useState('');

  const showAlert = (message) => {
    const alertBox = document.createElement('div');
    alertBox.classList.add('custom-alert2');
    alertBox.textContent = message;

    document.body.appendChild(alertBox);

    setTimeout(() => {
      alertBox.remove();
    }, 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'description') {
      setDescription(value);
    } else if (name === 'note') {
      setNote(value);
    } 
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (description.trim() === "" || note.trim() === "") {
      showAlert("Please enter both a note heading and a note.");
      return;
    }

    const data = {
      description,
      note,
    };

    axios.put(`http://localhost:8070/post/update/${id}`, data).then((res) => {
      if (res.data.success) {
        showAlert('Item Updated Successfully');
        setDescription('');
        setNote('');
      }
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:8070/post/${id}`).then((res) => { 
      if (res.data.success) {
        const { description, note } = res.data.post;

        setDescription(description);
        setNote(note);
      }
    });
  }, [id]);

  return (
    <div className="notepad-container">
      <Header />
      <Link to="/viewphasebook" className="back-btn">
        Back
      </Link>
      <h1 className="notepad-title edit-header">
        {" "}
        Phase{" "}
        <span style={{ color: "#368728", borderBottom: "2px solid #368728" }}>
          book
        </span>
      </h1>
      <form className="notepad-form" onSubmit={onSubmit}>
        <div className="form-group">
          <label>EDIT NOTE HEADING</label>
          <input
            type="text"
            className="form-control"
            name="description"
            placeholder="Enter Note Heading"
            value={description}
            onChange={handleInputChange}
          />
        </div>
        <label style={{ color: "#fff"}}>
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
        <div className="text-center">
          <button
            className="btn btn-warning"
            type="submit"
            style={{ marginTop: "15px" }}
          >
            <i className="far fa-check-square"></i>
            Edit Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPhase;
