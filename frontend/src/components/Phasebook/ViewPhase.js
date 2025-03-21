import React, { Component } from 'react';
import axios from 'axios';
import './Phasebook.css';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';
import Header from "../../Header/Navbar"

class ViewPhase extends Component {
  state = {
    userId:'',
    posts: [],
    searchKey: '',
    showConfirmationModal: false,
    postIdToDelete: null,
  };

  getId = () => {
    return localStorage.getItem('userId');
  }

  componentDidMount() {
    // Get the user ID from local storage
    const storedUserId = localStorage.getItem("userId");

    // If user ID exists in local storage, set it in the state
    if (storedUserId) {
      this.setState({ userId: storedUserId });
      this.retrievePosts();
    } else {
      // If user ID does not exist in local storage, you can handle it as per your requirement
    }
  }


  retrievePosts() {
    axios.get(`http://localhost:8070/posts/${localStorage.getItem('userId')}`)
      .then(res => {
        if (res.data.success) {
          console.log(res.data)
          this.setState({
            posts: res.data.postsByUser
          });
        }
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  }

  onDelete = (id) => {
    this.setState({
      showConfirmationModal: true,
      postIdToDelete: id,
    });
  }

  handleConfirmDelete = () => {
    const id = this.state.postIdToDelete;
    axios.delete(`http://localhost:8070/post/delete/${id}`)
      .then(() => {
        this.showAlert("Deleted Successfully", "success");
        this.retrievePosts();
      })
      .catch(error => {
        console.error("Error deleting post:", error);
        this.showAlert("Error deleting post", "error");
      });

    this.setState({
      showConfirmationModal: false,
      postIdToDelete: null,
    });
  }

  handleCancelDelete = () => {
    this.setState({
      showConfirmationModal: false,
      postIdToDelete: null,
    });
  }

  showAlert = (message, type) => {
    const alertBox = document.createElement('div');
    alertBox.classList.add('custom-alert', `custom-alert-${type}`);
    alertBox.textContent = message;

    document.body.appendChild(alertBox);

    setTimeout(() => {
      alertBox.remove();
    }, 3000);
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value.toLowerCase();
    this.setState({
      searchKey: searchKey
    });
  }

  generateReport = () => {
    const { posts, searchKey } = this.state;
    const filteredPosts = posts.filter(post =>
      post.description.toLowerCase().includes(searchKey) ||
      post.note.toLowerCase().includes(searchKey)
    );

    const doc = new jsPDF();

    
    doc.setFontSize(16);
    doc.text('ALL NOTES', 10, 10);

   
    doc.setFontSize(12);

    
    filteredPosts.forEach((post, index) => {
      const yPos = 30 + (index * 50); 

      doc.text(`TOPIC: ${post.description}`, 10, yPos);
      doc.text(`${post.note}`, 10, yPos + 10);
    });

    // Save the report
    doc.save('report.pdf');
  }

  render() {
    const { posts, searchKey, showConfirmationModal } = this.state;
    const filteredPosts = posts.filter(post =>
      post.description.toLowerCase().includes(searchKey) ||
      post.note.toLowerCase().includes(searchKey)
    );
  
    return (
      <div className="container">
        <div className='container-1'>
        <Header />
        <br></br>
        <br></br>
        <h1 className="top-heading">
          Phase
          <span style={{ color: "#368728", borderBottom: "2px solid #368728" }}>
            book
          </span>
        </h1>

        <br></br>
        <div className="search-box">
          <button className="searchQuery">
            <i className="fas fa-search"></i>
          </button>
          <input style={{color:"black"}}
            type="text"
            className="input-search"
            placeholder="Type header to Search..."
            onChange={this.handleSearchArea}
          />
        </div>
        <Link to="/addphase" className="addnt-btn">
          Add Notes
        </Link>
        <button className="back-btn" onClick={this.generateReport}>
          <i className="fas fa-file"></i>&nbsp;Generate Report
        </button>

        <div className="items">
          {filteredPosts.map((post, index) => (
            <div className="notes" key={index}>
              <h1>{post.description}</h1>
              <p>{post.note}</p>
              <a
                className="btn btn-outline-dark"
                href={`EditPhase/${post._id}`}
              >
                <i className="fas fa-edit"></i>&nbsp;Edit
              </a>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                className="btn btn-outline-danger"
                onClick={() => this.onDelete(post._id)}
              >
                <i className="far fa-trash-alt"></i>&nbsp;Delete
              </button>
              <br></br>
              <br></br>
            </div>
          ))}
        </div>
        {showConfirmationModal && (
          <div className="confirmation-modal">
            <div className="modal-content">
              <h2>Are you sure?</h2>
              <p>Are you sure you want to delete this post?</p>
              <div className="button-container">
                <button
                  className="cancel-button"
                  onClick={this.handleCancelDelete}
                >
                  Cancel
                </button>
                <button
                  className="confirm-button"
                  onClick={this.handleConfirmDelete}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    );
  }
}

export default ViewPhase;
