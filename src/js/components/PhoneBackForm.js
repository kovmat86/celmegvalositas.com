/* global $ */
import React from 'react';
import { Icon } from 'react-fa';
import { showPleaseWaitModal, hidePleaseWaitModal } from './PleaseWaitModal';
import { showErrorModal } from './ErrorModal';
import { showPhoneBackConfirmationModal } from './PhoneBackConfirmationModal';
import { 
  trackSubmitPhoneBackEvent,
  trackSubmitPhoneBackEventSuccess,
  trackSubmitPhoneBackEventFailure
} from './GoogleAnalytics';

const endpoint = process.env.PHONEBACK_SERVICE;

class PhoneBackForm extends React.Component {

  constructor(props) {
    super(props);
    this.id = this.props.id || `from-${Math.round(Math.random() * 1000)}`;
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.props.onSubmit || (() => {});
    this.onSuccess = this.props.onSuccess || (() => {});
  }

  componentDidMount() {
    $(`#${this.id} .timepicker`).timepicker({
      timeFormat: 'HH:mm',
      interval: 60,
      minTime: '8',
      maxTime: '21:00',
      defaultTime: new Date().getHours(),
      startTime: '08:00',
      dynamic: false,
      dropdown: true,
      scrollbar: true
    });
  }

  onClick(evt) {
    evt.preventDefault();
    
    Promise
      .resolve()
      .then(this.props.onSubmit)
      .then(trackSubmitPhoneBackEvent)
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
    trackSubmitPhoneBackEventSuccess();
    showPhoneBackConfirmationModal();
    this.props.onSuccess();
  }

  sadPath() {
    trackSubmitPhoneBackEventFailure();
    return hidePleaseWaitModal()
      .then(showErrorModal);
  }  

  render() {
    return (
      <form id={this.id}>
        <div className="form-group row">
          <div className="col input-box">
            <input aria-label="name" type="text" className="form-control" placeholder="Név" />
            <span>
              <Icon name="user" />
            </span>
          </div>
        </div>
        <div className="form-group row">
          <div className="col input-box">
            <input aria-label="phone" type="text" className="form-control" placeholder="Telefonszám" />
            <span>
              <Icon name="phone" />
            </span>
          </div>
        </div>
        <div className="form-group row">
          <div className="col input-box">
            <input aria-label="email" type="text" className="form-control" placeholder="Email" />
            <span>
              <Icon name="envelope" />
            </span>
          </div>
        </div>
        <div className="form-group row">
          <div className="col input-box">
            <input aria-label="hours of callback" className="form-control timepicker" placeholder="Visszahívás időpontja" />
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

export { PhoneBackForm };
export default PhoneBackForm;
