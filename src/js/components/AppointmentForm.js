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
const emailRegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const phoneRegExp = /[0-9]{7,11}/;

class AppointmentForm extends React.Component {

  constructor(props) {
    super(props);
    this.id = this.props.id || `from-${Math.round(Math.random() * 1000)}`;
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.props.onSubmit || (() => {});
    this.onSuccess = this.props.onSuccess || (() => {});
  }

  componentDidMount() {
    this.$form = $(`#${this.id}`);
    this.$form.find('.datepicker').datepicker({
      startDate: 'today',
      todayHighlight: true
    });

    this.$form.find('input').keyup(() => this.validateAgainstErrors());
  }

  onClick(evt) {
    evt.preventDefault();
    
    if (this.validateAgainstErrors()) return;

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

  validateAgainstErrors() {
    const $form = this.$form;
    const data = this.serializeFormData($form);
    let error = false;
    let $name = $form.find('input[name=name]');
    let $phone;
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
    
    return error;
  }  

  sendFormDataToMessageService() {
    const $form = this.$form;
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
          <div className="col-xs-12 col-md-6 input-box">
            <div className="datepicker" />
          </div>
          <div className="col-xs-12 col-md-6">
            <button>Test</button>
            <button>Test</button>
            <button>Test</button>
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
