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
const emailRegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const phoneRegExp = /[0-9]{7,11}/;

class PhoneBackForm extends React.Component {

  constructor(props) {
    super(props);
    this.id = this.props.id || `from-${Math.round(Math.random() * 1000)}`;
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.props.onSubmit || (() => {});
    this.onSuccess = this.props.onSuccess || (() => {});
  }

  componentDidMount() {
    this.$form = $(`#${this.id}`);
    this.$form.find('.timepicker').timepicker({
      timeFormat: 'HH:mm',
      interval: 30,
      minTime: '8',
      maxTime: '21:00',
      defaultTime: new Date().getHours(),
      startTime: '08:00',
      dynamic: false,
      dropdown: true,
      scrollbar: true,
      change: time => {
        if (!time) return;
        this.validate();
      }
    });

    this.$form.find('input:not(.timepicker)').keyup(() => this.validate());
  }

  onClick(evt) {
    evt.preventDefault();

    if (this.validate()) return;
    
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

  validate() {
    const $form = this.$form;
    const data = this.serializeFormData($form);
    let error = false;
    let $name = $form.find('input[name=name]');
    let $phone;
    let $time;
    let $email;

    if (!data.name) {
      $name.parent().addClass('error');
      error = true;
    } else {
      $name.parent().removeClass('error')
    }

    $phone = $form.find('input[name=phone]');
    if (!data.phone || !data.phone.match(phoneRegExp)) {
      $phone.parent().addClass('error');
      error = true;
    } else {
      $phone.parent().removeClass('error')
    }

    $email = $form.find('input[name=email]');
    if (!data.email || !data.email.match(emailRegExp)) {
      $email.parent().addClass('error');
      error = true;
    } else {
      $email.parent().removeClass('error')
    }
    
    $time = $form.find('input[name=time]');
    if (!data.time) {
      $time.parent().addClass('error');
      error = true;
    } else {
      $time.parent().removeClass('error')
    }

    return error;
  }

  sendFormDataToMessageService() {
    const json = JSON.stringify(this.serializeFormData(this.$form));
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
            <input name="time" aria-label="hours of callback" className="form-control timepicker" placeholder="Visszahívás időpontja" />
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
