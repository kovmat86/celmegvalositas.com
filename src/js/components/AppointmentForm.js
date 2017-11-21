/* global $ */
import React from 'react';
import { Icon } from 'react-fa';
import { showPleaseWaitModal, hidePleaseWaitModal } from './PleaseWaitModal';
import { showErrorModal } from './ErrorModal';
import { showAppointmentConfirmationModal } from './AppointmentConfirmationModal';
import { 
  trackSubmitAppointmentEvent,
  trackSubmitAppointmentEventSuccess,
  trackSubmitAppointmentEventFailure
} from './GoogleAnalytics';

const endpoint = process.env.APPOINTMENT_SERVICE;

class AppointmentForm extends React.Component {

  constructor(props) {
    super(props);
    this.id = this.props.id || `from-${Math.round(Math.random() * 1000)}`;
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.props.onSubmit || (() => {});
    this.onSuccess = this.props.onSuccess || (() => {});
  }

  onClick(evt) {
    evt.preventDefault();
    
    Promise
      .resolve()
      .then(this.props.onSubmit)
      .then(trackSubmitAppointmentEvent)
      .then(showPleaseWaitModal)
      .then(this.sendFormDataToMessageService.bind(this))
      .then(hidePleaseWaitModal)
      .then(this.happyPath.bind(this))
      .catch(this.sadPath.bind(this));
  }

  sendFormDataToMessageService() {
    const $form = $(`#${this.id}`);
    const json = JSON.stringify(this.serializeFormData($form));
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: json,
        url: endpoint,
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
    trackSubmitAppointmentEventSuccess();
    showAppointmentConfirmationModal();
    this.props.onSuccess();
  }

  sadPath() {
    trackSubmitAppointmentEventFailure();
    return hidePleaseWaitModal()
      .then(showErrorModal);
  }  

  render() {
    return (
      <form id={this.id}>
        <div className="form-group row">
          <div className="col input-box">
            <input name="name" aria-label="name" type="text" className="form-control" placeholder="Név" />
            <span>
              <Icon name="user" />
            </span>
          </div>
        </div>
        <div className="form-group row">
          <div className="col input-box">
            <input name="phone" aria-label="phone" type="text" className="form-control" placeholder="Telefonszám" />
            <span>
              <Icon name="phone" />
            </span>
          </div>
        </div>
        <div className="form-group row">
          <div className="col input-box">
            <input name="email" aria-label="email" type="text" className="form-control" placeholder="Email" />
            <span>
              <Icon name="envelope" />
            </span>
          </div>
        </div>
        <div className="form-group row">
          <div className="col input-box">
            <input name="date" aria-label="hours of callback" className="form-control timepicker" placeholder="Visszahívás időpontja" />
            <span>
              <Icon name="clock-o" />
            </span>
          </div>
        </div>                
        <div className="form-group row">
          <div className="col pull-right">
            <input 
              aria-label={this.props.ctaLable} 
              className="btn btn-gold raised btn-block" 
              type="submit" 
              value={this.props.ctaLabel} 
              onClick={this.onClick} />
          </div>
        </div>
      </form>
    );
  }
}

export { AppointmentForm };
export default AppointmentForm;
