'use strict';
import React from 'react';
import classNames from 'classnames';
import { Icon } from 'react-fa';

export default class HeroVideo extends React.Component {

  static propTypes = {
    contentProvider: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = this.props.contentProvider.get('heroVideoContent') || {};
  }  

  render() {

    const _className = classNames('hero-video-content-conteiner', this.props.className);

    return (
      <div className={_className}>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div id="mission-statement-container">
              <h1 className="animated fadeInDown">{this.state.missionStatement}</h1>
              <p className="lead animated fadeInDown">{this.state.elevatorPitch}</p>
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div id="consultation-container" className="container animated fadeIn">
              <h3>{this.state.formTitle}</h3>
              <p>{this.state.formSubtitle}</p>
              <form>
                <div className="form-group row">
                  <div className="col input-box">
                    <input aria-label="email" type="email" className="form-control" id="consultation-form-email" placeholder="Email" />
                    <span>
                      <Icon name="user" />
                    </span>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col input-box">
                    <input aria-label="name" type="text" className="form-control" id="consultation-form-name" placeholder="Password" />
                    <span>
                      <Icon name="user" />
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
          </div>
        </div>
      </div>      
    );

  }
}
