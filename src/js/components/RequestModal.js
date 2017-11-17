/* global $ */
import React from 'react';
import { SignupModal } from 'neal-react';
import { showModal, hideModal } from '../helpers/popups';
import PhoneBackForm from './PhoneBackForm';

const modalId = 'request-phoneback-modal';
const pleaseWaitId = 'please-wait-modal';
const messageServiceUrl = process.env.MESSAGE_SERVICE;

function serializeFormData($form) {
  if (!$form) throw 'Invalid input!';
  return $form.serializeArray().reduce((m, o) => { 
    m[o.name] = o.value; 
    return m;
  }, {});
}

class RequestModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.contentProvider.get('phoneBackModal') || {};
  }

  onSendRequest() {
    Promise
      .resolve()
      .then(this.emitSubmitEvent.bind(this))
      .then(hideModal.bind(this, modalId))
      .then(showModal.bind(this, pleaseWaitId))
      .then(this.sendFormDataToMessageService.bind(this))
      .then(hideModal.bind(this, pleaseWaitId))
      .then(this.happyPath.bind(this))
      .catch(this.sadPath.bind(this));
  }

  emitSubmitEvent() {
    $(document).trigger('phoneback/submit');
  }

  sendFormDataToMessageService() {
    const $form = $(`#${modalId} form`);
    const json = JSON.stringify(serializeFormData($form));
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: json,
        url: messageServiceUrl,
        success: resolve,
        error: reject
      });
    });
  }

  serializeFormData($form) {
    if (!$form) throw 'Invalid input!';
    return $form.serializeArray().reduce((m, o) => { 
      m[o.name] = o.value; 
      return m;
    }, {});
  }

  happyPath() {
    $(document).trigger('phoneback/submit/happy-path');
    return showModal('request-confirmation-modal');
  }

  sadPath() {
    $(document).trigger('phoneback/submit/sad-path');
    return hideModal(pleaseWaitId)
      .then(showModal.bind(this, 'error-modal'));
  } 

  render() {
    return (
      <div className="modal fade neal-signup-modal product-info-modal" key={modalId} id={modalId}
      tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
              <h3>{ this.state.title }</h3>
            </div>
            <div className="modal-body">
              <p>{ this.state.description }</p>
              <PhoneBackForm ctaLabel={this.state.buttonLabel} ctaClick={this.onSendRequest.bind(this)}/>
            </div>
          </div>
        </div>
      </div>      
    );    
  }

}

export { RequestModal };
export default RequestModal;
