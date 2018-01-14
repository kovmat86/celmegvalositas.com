import React from 'react';
import { showModal, hideModal } from '../helpers/popups';

let modalId;

class PhoneBackConfirmationModal extends React.Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    modalId: React.PropTypes.string.isRequired
  }

  static defaultProps = {
    title: 'Visszahívás kérése sikeres volt',
    text: 'A megjelölt időpontban keresni fogjuk a megadott telefonszámon!',
    modalId: 'phoneback-confirmation-modal',
    buttonText: 'Rendben'
  };

  render() {
    modalId = this.props.modalId;
    return (
      <div className="modal fade neal-signup-modal" key={modalId} id={modalId}
      tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h3 class="modal-title lead">{ this.props.title }</h3>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{ this.props.text }</p>
            </div>
            <div className="modal-footer">
              <button type="submit" data-dismiss="modal" aria-label="Close" className="btn btn-primary btn-block btn-ghost">{this.props.buttonText}</button>
            </div>
          </div>
        </div>
      </div>      
    );
  }

}

function showPhoneBackConfirmationModal() {
  showModal(modalId);
}

function hidePhoneBackConfirmationModal() {
  hideModal(modalId);
}

export { showPhoneBackConfirmationModal, hidePhoneBackConfirmationModal };
export default PhoneBackConfirmationModal;
