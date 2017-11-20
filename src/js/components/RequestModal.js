/* global $ */
import React from 'react';
import { hideModal } from '../helpers/popups';
import { trackOpenPhoneBackModal } from './GoogleAnalytics';
import PhoneBackForm from './PhoneBackForm';

class RequestModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.contentProvider.get('phoneBackModal') || {};
    this.onSubmit = this.onSubmit.bind(this);
    this.modalId = 'request-phoneback-modal';
  }

  componentDidMount() {
    const $modal = $(`#${this.modalId}`);
    $modal.on('shown.bs.modal', () => trackOpenPhoneBackModal());
  }

  onSubmit() {
    hideModal(this.modalId);
  }

  render() {
    return (
      <div className="modal fade neal-signup-modal" key={this.modalId} id={this.modalId}
      tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{ this.state.title }</h3>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>              
            </div>
            <div className="modal-body">
              <p>{ this.state.description }</p>
              <PhoneBackForm 
                ctaLabel={this.state.buttonLabel} 
                onSubmit={this.onSubmit} />
            </div>
          </div>
        </div>
      </div>      
    );    
  }

}

export { RequestModal };
export default RequestModal;
