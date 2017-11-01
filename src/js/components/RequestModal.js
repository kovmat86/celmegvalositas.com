/* global $ */
import React from 'react';
import { SignupModal } from 'neal-react';

const modalId = 'request-appointment-modal';
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
    this.state = this.props.contentProvider.get('requestModal') || {};
  }

  onSendRequest() {
    Promise
      .resolve()
      .then(this.emitSubmitEvent.bind(this))
      .then(this.hide.bind(this, modalId))
      .then(this.show.bind(this, pleaseWaitId))
      .then(this.sendFormDataToMessageService.bind(this))
      .then(this.hide.bind(this, pleaseWaitId))
      .then(this.happyPath.bind(this))
      .catch(this.sadPath.bind(this));
  }

  emitSubmitEvent() {
    $(document).trigger('request/submit');
  }

  hide(modalId) {
    const $modal = $(`#${modalId}`);
    return new Promise(resolve => {
      $modal.one('hidden.bs.modal', () => {
        resolve();
      });
      $modal.modal('hide');
    });
  }

  show(modalId) {
    const $modal = $(`#${modalId}`);
    return new Promise(resolve => {
      $modal.one('shown.bs.modal', () => {
        resolve();
      });
      $modal.modal('show');
    });      
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
    $(document).trigger('request/submit/happy-path');
    return this.show('request-confirmation-modal');
  }

  sadPath() {
    $(document).trigger('request/submit/sad-path');
    return this.hide(pleaseWaitId)
      .then(this.show.bind(this, 'error-modal'));
  } 

  render() {
    return (
      <SignupModal title={this.state.title} buttonText={this.state.buttonLabel} modalId={modalId} onSubmit={this.onSendRequest}>
        <div>
          <p>
            {this.state.description}
          </p>
        </div>
        <div>
          <SignupModal.Input name="name" required label={this.state.name} placeholder={this.state.name} />
          <SignupModal.Input type="email" required name="email" label={this.state.email} placeholder={this.state.email} />
        </div>
      </SignupModal>
    );    
  }

}

export { RequestModal };
export default RequestModal;
