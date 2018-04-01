/* global $ */
import React from 'react';
import { Icon } from 'react-fa';
import { showPleaseWaitModal, hidePleaseWaitModal } from './PleaseWaitModal';
import { showErrorModal } from './ErrorModal';
import { showAppointmentConfirmationModal } from './AppointmentConfirmationModal';
import AppointmentTimePicker from './AppointmentTimePicker';
import { 
  trackSubmitAppointmentEvent,
  trackSubmitAppointmentEventSuccess,
  trackSubmitAppointmentEventFailure
} from './GoogleAnalytics';

// TODO: kovmat86 hardcoded hostname because process.env does not work
const serviceHost = process.env.SERVICE_HOST || 'http://localhost:8095/';
const requestEndPoint = 'request/appointment';
const fetchEndPoint='fetch/appointments';

const endpoint = process.env.SERVICE_HOST;
const emailRegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const phoneRegExp = /[0-9]{7,11}/;

class AppointmentForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { appointments: [] }
    this.id = this.props.id || `from-${Math.round(Math.random() * 1000)}`;
    this.onClick = this.onClick.bind(this);
    this.onPickDate = this.onPickDate.bind(this);
    this.onPickSlot = this.onPickSlot.bind(this);
    this.fetchAppointments = this.fetchAppointments.bind(this);
    this.onSubmit = this.props.onSubmit || (() => {});
    this.onSuccess = this.props.onSuccess || (() => {});
  }

  componentDidMount() {
    this.$form = $(`#${this.id}`);
    this.$form.find('input').keyup(() => this.validateAgainstErrors());
    this.fetchAppointments();
  }

  fetchAppointments() {
    // TODO: proper error on the UI when appointments cannot be fetched
    fetch(serviceHost + fetchEndPoint)
      .then(result => result.json())
      .then(appointments => this.setState({appointments}));
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

  onPickDate(date) {
    this.setState({
      selectedDate: date,
      selectedSlot: undefined
    });
  }

  onPickSlot(slot) {
    this.setState({selectedSlot: slot});
    this.validateAgainstErrors();
  }

  validateAgainstErrors() {
    const $form = this.$form;
    const data = this.serializeFormData($form);
    let error = false;

    const $name = $form.find('input[name=name]');
    if (!data.name) {
      $name.parent().addClass('error');
      error = true;
    } else {
      $name.parent().removeClass('error')
    }

    const $phone = $form.find('input[name=phone]');
    if (!data.phone || !data.phone.match(phoneRegExp)) {
      $phone.parent().addClass('error');
      error = true;
    } else {
      $phone.parent().removeClass('error')
    }

    const $email = $form.find('input[name=email]');
    if (!data.email || !data.email.match(emailRegExp)) {
      $email.parent().addClass('error');
      error = true;
    } else {
      $email.parent().removeClass('error')
    }

    const $errorMessage = $form.find('.errorMessage')
    if (!this.state.selectedDate || !this.state.selectedSlot) {
      $errorMessage.text('Kérjük válasszon időpontot!');
      error = true;
    } else {
      $errorMessage.text('');
    }

    return error;
  }

  sendFormDataToMessageService() {
    const $form = this.$form;
    let formData = this.serializeFormData($form);
    formData.date = this.state.selectedDate;
    formData.slot = this.state.selectedSlot;

    const json = JSON.stringify(formData);
    return new Promise((resolve, reject) => {
      $.ajax({
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: json,
        url: serviceHost + requestEndPoint,
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
    this.setState({selectedSlot: undefined});
    this.fetchAppointments();
  }

  sadPath(err) {
    console.log(err);
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
        <AppointmentTimePicker
          formId={this.id}
          appointments={this.state.appointments}
          onPickDate={this.onPickDate}
          onPickSlot={this.onPickSlot}
          />
        <span className='error errorMessage' />
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
