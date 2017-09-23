'use strict';
import React from 'react';
import classNames from 'classnames';
import { default as Video } from 'react-html5video';

export default class HeroVideo extends React.Component {

  render() {

    const _className = classNames('hero-video jumbotron jumbotron-fluid', this.props.className);

    return (
      <div className={_className}>
		    <Video autoPlay loop muted poster={ this.props.poster }>
          <source src={ this.props.source.url } type={ this.props.source.type } />
        </Video>
        <div className="backdrop" />  
        <div className="container">
          { this.props.children }
        </div>
      </div>
    );

  }
}
