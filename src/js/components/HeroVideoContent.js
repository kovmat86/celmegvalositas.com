'use strict';
import React from 'react';
import classNames from 'classnames';
import PhoneBackForm from './PhoneBackForm';

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
          <div className="col-xs-12 col-md-12 logo-container animated fadeIn">
            <img src="resources/images/logo-min.png" alt="logo" />
          </div>
          <div className="col-xs-12 col-md-6">
            <div id="mission-statement-container">
              <h1 className="animated fadeInDown">{this.state.missionStatement}</h1>
              <p className="lead animated fadeInDown">{this.state.elevatorPitch}</p>
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="container animated fadeIn consultation-container">
              <h3>{this.state.formTitle}</h3>
              <p>{this.state.formSubtitle}</p>
              <PhoneBackForm id="hero-video-form" ctaLabel={this.state.formCtaLabel} />
            </div>
          </div>
        </div>
      </div>      
    );

  }
}
