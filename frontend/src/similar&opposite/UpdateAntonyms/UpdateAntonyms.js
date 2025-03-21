import React, { useState, useEffect, useRef} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

function searchByWord() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("form1");
  filter = input.value.toLowerCase();
  table = document.getElementById("table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.innerText.toLowerCase();
      if (txtValue.indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

export default function UpdateAntonyms() {

  const [antonyms, setAntonyms] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const inputRefs = useRef([]);

  const editAntonym = (index) => {
    const inputElement = inputRefs.current[index];
    inputElement.disabled = false;

    console.log(antonyms[index]._id);
  };

  const handleKeyPress = (event, index) => {
    const id = antonyms[index]._id;
    const word = antonyms[index].word;
    const antonym = antonyms[index].antonym;
    const status = antonyms[index].status;

    const updateAntonym = {
      word,
      antonym,
      status,
    };

    if (event.key === "Enter") {
      axios
        .put(
          `http://localhost:8070/antonyms/updateAntonym/${id}`,
          updateAntonym
        )
        .then(() => {
          setShowPopup(true);
          const inputElement = inputRefs.current[index];
          inputElement.disabled = true;
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  
  const handleInputChange = (event, id) => {
    const newInputValues = antonyms.map((input) => {
      if (input._id === id) {
        return { ...input, antonym: event.target.value };
      }
      return input;
    });
    setAntonyms(newInputValues);
  };















  

  useEffect(() => {
    function getAntonym() {
      axios.get("http://localhost:8070/antonyms/antonymTable").then((res) => {
        setAntonyms(res.data);
      }).catch((err) => {
        alert(err.message);
      })
    }
    getAntonym();
  }, [])
  
  //delete
  const deleteAntonym = (antonymId) => {
    // console.log("event for delete", e.target);
    axios
      .delete(`http://localhost:8070/antonyms/deleteAntonym/${antonymId}`)
      .then((res) => {
        console.log("done");
        setShowPopup(true);
      })
      .catch((err) => console.log(err));
      window.location.reload();
  };

  return (
    <div>
      <br></br>
      <br></br>

      <h1>Update Antonyms</h1>

      <div className="">
          <input
            type="search"
            id="form1"
            className="searchWord"
            onKeyUp={searchByWord}
            placeholder="Search by word"
          />
        </div>

      <div className="table-container">
        <table className="sy-table" id="table">
          <tr>
            <th style={{ width: '300px' }}>number</th>
            <th>Word</th>
            <th>Antonyms</th>
            <th >Update</th>
            <th >Delete</th>
          </tr>
          {antonyms && antonyms.map((antonym, index) => (
            <tr>
              <td>{index + 1}</td>
              <td><p key={antonym._id}>{antonym.word}</p></td>
              {/* <td><p key={antonym._id}>{antonym.antonym}</p></td> */}
              <td className="td">
                      <input
                        className="td-input"
                        key={antonym._id}
                        disabled
                        ref={(el) => (inputRefs.current[index] = el)}
                        value={antonym.antonym}
                        onChange={(e) => {
                          handleInputChange(e, antonym._id);
                        }}
                        onKeyDown={(event) => {
                          handleKeyPress(event, index);
                        }}
                      />
              </td>
              <td> 
              <button className="action-button" type="button" onClick={() => {
                          editAntonym(index);
                        }}>
              <i class="bi bi-pencil-square" style={{ marginLeft: '40px' }}></i>
              {/* <Link > */}
                <svg style={{ color: '144a7c' }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg>
              {/* </Link> */}
              </button>
              </td>
              <td>
              <button className="action-button" onClick={()=> deleteAntonym(antonym._id)} type="button"  >
                <i  class="bi bi-trash3-fill" style={{ marginLeft: '40px' }}></i>
                <svg style={{ color: '72160f' }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                </svg>
              </button>
              </td>

            </tr>
          ))}
        </table>
      </div>


      {showPopup === true && (
        <div className="popup">
          <div className="d-flex justify-content-center popup-box">
            <div className="text-white pop-heading">Successfully updated</div>

            <button
              onClick={() => {
                setShowPopup(false);
              }}
              className="pop-btn btn-success"
            >
              ok
            </button>
          </div>
        </div>
      )}


      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
        <button type="button" class="btn1" >
          <Link to="/addAntonyms">
            <i class="bi bi-plus-circle-fill"></i>
            <svg style={{ color: '#ffffff' }} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
            </svg>
          </Link>
        </button>
      </div>
      
    </div>
  )
}
