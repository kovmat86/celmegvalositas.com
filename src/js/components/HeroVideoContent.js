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
            <div className="container consultation-container">
              <form>
                <div class="form-group row">
                  <div class="col">
                    <input aria-label="email" type="email" class="form-control" id="consultation-form-email" placeholder="Email">
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col">
                    <input aria-label="name" type="text" class="form-control" id="consultation-form-name" placeholder="Password">
                  </div>
                </div>
                <div class="row">
                  <div class="col pull-right">
                    <input type="submit" class="btn btn-warning btn-block" value="Submit" />
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
