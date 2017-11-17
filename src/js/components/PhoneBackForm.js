/* global $ */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Icon } from 'react-fa';

class PhoneBackForm extends React.Component {

  constructor(props) {
    super(props);
    this.id = this.props.id || `from-${Math.random()}`;
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
            <input aria-label={this.props.ctaLable} className="btn btn-gold raised btn-block" type="submit" value={this.props.ctaLabel} />
          </div>
        </div>
      </form>
    );
  }
}

export { PhoneBackForm };
export default PhoneBackForm;
