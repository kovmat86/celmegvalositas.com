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

    const _className = classNames('hero-video-content-conteinr', this.props.className);

    return (
      <div className={_className}>
        <div className="row justify-content-md-center">
          <div className="col col-md-6 col-sm-12 col-xs-12">
            <h1 className="display-4 animated fadeInDown">{this.state.homepage.missionStatement}</h1>
            <p className="lead animated fadeInDown">{this.state.homepage.elevatorPitch}</p>
          </div>
          <div className="col col-md-6 col-sm-12 col-xs-12">
            <div className="consultation-container">
              The form comes here...
            </div>
          </div>
        </div>
      </div>      
    );

  }
}
