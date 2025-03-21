import React from 'react';
import './Phasebook';

class ConfirmationModal extends React.Component {
  render() {
    return (
      <div className="confirmation-modal">
        <div className="modal-content">
          <h2>Are you sure?</h2>
          <p>{this.props.message}</p>
          <div className="button-container">
            <button className="cancel-button" onClick={this.props.onCancel}>Cancel</button>
            <button className="confirm-button" onClick={this.props.onConfirm}>Confirm</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmationModal;
