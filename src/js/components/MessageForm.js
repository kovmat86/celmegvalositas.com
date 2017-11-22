/* global $ */
import React from 'react';
import { Icon } from 'react-fa';
import { showPleaseWaitModal, hidePleaseWaitModal } from './PleaseWaitModal';
import { showErrorModal } from './ErrorModal';
import { showMessageConfirmationModal } from './MessageConfirmationModal';

const endpoint = process.env.MESSAGE_SERVICE;
const emailRegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

class MessageForm extends React.Component {

  constructor(props) {
    super(props);
    this.id = this.props.id || `from-${Math.round(Math.random() * 1000)}`;
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.props.onSubmit || (() => {});
    this.onSuccess = this.props.onSuccess || (() => {});
  }

  componentDidMount() {
    this.$form = $(`#${this.id}`);
    this.$form.find('input').keyup(() => this.validateAgainstErrors());
    this.$form.find('textarea').keyup(() => this.validateAgainstErrors());
  }

  onClick(evt) {
    evt.preventDefault();

    if (this.validateAgainstErrors()) return;
    
    Promise
      .resolve()
      .then(this.props.onSubmit)
      .then(showPleaseWaitModal)
      .then(this.sendFormDataToMessageService.bind(this))
      .then(hidePleaseWaitModal)
      .then(this.happyPath.bind(this))
      .catch(this.sadPath.bind(this));
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

  validateAgainstErrors() {
    const $form = this.$form;
    const data = this.serializeFormData($form);
    let error = false;
    let $name = $form.find('input[name=name]');
    let $email;
    let $message;

    if (!data.name) {
      $name.parent().addClass('error');
      error = true;
    } else {
      $name.parent().removeClass('error')
    }

    $email = $form.find('input[name=email]');
    if (!data.email || !data.email.match(emailRegExp)) {
      $email.parent().addClass('error');
      error = true;
    } else {
      $email.parent().removeClass('error')
    }

    $message = $form.find('textarea');
    if (!data.message) {
      $message.parent().addClass('error');
      error = true;
    } else {
      $message.parent().removeClass('error')
    }
    
    return error;
  }  

  serializeFormData($form) {
    if (!$form) throw 'Invalid input!';
    return $form.serializeArray().reduce((m, o) => { 
      m[o.name] = o.value; 
      return m;
    }, {});
  }

  happyPath() {
    showMessageConfirmationModal();
    this.props.onSuccess();
  }

  sadPath() {
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
            <input name="email" aria-label="email" type="text" className="form-control" placeholder="Email" />
            <span>
              <Icon name="envelope" />
            </span>
          </div>
        </div>
        <div className="form-group row">
          <div className="col input-box">
            <textarea name="message" aria-label="message" placeholder="Írd le a kérdésed!" />
            <span>
              <Icon name="comment" />
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

export { MessageForm };
export default MessageForm;
