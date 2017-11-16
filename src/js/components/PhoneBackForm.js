import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Icon } from 'react-fa';

class PhoneBackForm extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container animated fadeIn consultation-container">
        <h3>{this.props.title}</h3>
        <p>{this.props.subtitle}</p>
        <form>
          <div className="form-group row">
            <div className="col input-box">
              <input aria-label="name" type="text" className="form-control" id="consultation-form-name" placeholder="Név" />
              <span>
                <Icon name="user" />
              </span>
            </div>
          </div>
          <div className="form-group row">
            <div className="col input-box">
              <input aria-label="phone" type="text" className="form-control" id="consultation-form-phone" placeholder="Telefonszám" />
              <span>
                <Icon name="phone" />
              </span>
            </div>
          </div>
          <div className="form-group row">
            <div className="col input-box">
              <input aria-label="email" type="text" className="form-control" id="consultation-form-email" placeholder="Email" />
              <span>
                <Icon name="envelope" />
              </span>
            </div>
          </div>
          <div className="form-group row">
            <div className="col input-box">
              <input aria-label="email" type="text" className="form-control" id="consultation-form-email" placeholder="Email" />
              <span>
                <Icon name="envelope" />
              </span>
            </div>
          </div>                
          <div className="form-group row">
            <div className="col pull-right">
              <input aria-label={this.state.formCtaLable} className="btn btn-gold raised btn-block" type="submit" value={this.state.formCtaLabel} />
            </div>
          </div>
        </form>
      </div>      
    );
  }
}

export { PhoneBackForm };
export default PhoneBackForm;
