import React, { useState, useEffect, useRef} from "react";
import { Link } from 'react-router-dom';
import './UpdateSynonyms.css';
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

export default function UpdateSynonyms() {

  const [synonyms, setSynonyms] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const inputRefs = useRef([]);

  const editSynonym = (index) => {
    const inputElement = inputRefs.current[index];
    inputElement.disabled = false;

    console.log(synonyms[index]._id);
  };

  const handleKeyPress = (event, index) => {
    const id = synonyms[index]._id;
    const word = synonyms[index].word;
    const synonym = synonyms[index].synonym;
    const status = synonyms[index].status;

    const updatedSynonym = {
      word,
      synonym,
      status,
    };

    if (event.key === "Enter") {
      axios
        .put(
          `http://localhost:8070/synonyms/updateSynonym/${id}`,
          updatedSynonym
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
    const newInputValues = synonyms.map((input) => {
      if (input._id === id) {
        return { ...input, synonym: event.target.value };
      }
      return input;
    });
    setSynonyms(newInputValues);
  };















  

  useEffect(() => {
    function getSynonyms() {
      axios.get("http://localhost:8070/synonyms/synonymsTable").then((res) => {
        setSynonyms(res.data);
      }).catch((err) => {
        alert(err.message);
      })
    }
    getSynonyms();
  }, [])

  //delete
  const deleteSynonym = (synonymId) => {
    // console.log("event for delete", e.target);
    axios
      .delete(`http://localhost:8070/synonyms/deleteSynonym/${synonymId}`)
      .then((res) => {
        setShowPopup(true);
        console.log("done");
      })
      .catch((err) => console.log(err));
    window.location.reload();
  };

  return (
    <div>
      <br></br>
      <br></br>

      <h1>Update Synonyms</h1>

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
            <th>Synonyms</th>
            <th >Update</th>
            <th >Delete</th>
          </tr>
          {synonyms && synonyms.map((synonym, index) => (
            <tr>
              <td>{index + 1}</td>
              <td><p key={synonym._id}>{synonym.word}</p></td>
              {/* <td><p key={synonym._id}>{synonym.synonym}</p></td> */}
              <td className="td">
                      <input
                        className="td-input"
                        key={synonym._id}
                        disabled
                        ref={(el) => (inputRefs.current[index] = el)}
                        value={synonym.synonym}
                        onChange={(e) => {
                          handleInputChange(e, synonym._id);
                        }}
                        onKeyDown={(event) => {
                          handleKeyPress(event, index);
                        }}
                      />
              </td>
              <td> 
              <button className="action-button" type="button" onClick={() => {
                          editSynonym(index);
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
              <button className="action-button" onClick={()=> deleteSynonym(synonym._id)} type="button"  >
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
          <Link to="/addSynonyms">
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
