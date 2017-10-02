'use strict';
import React from 'react';
import classNames from 'classnames';

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
            <h1 className="animated fadeInDown">{this.state.missionStatement}</h1>
            <p className="lead animated fadeInDown">{this.state.elevatorPitch}</p>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="consultation-container">
              The form comes here...
            </div>
          </div>
        </div>
      </div>      
    );

  }
}
