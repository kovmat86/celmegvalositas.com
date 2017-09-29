/* global window, google */
import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader';

const GoogleMapAPIKey = 'AIzaSyAFbBhRbW0SqBuFGANi-MdGh__Up9_smiw';

class WhereWeAre extends React.Component {

  constructor(props) {
    super(props);
    this.id = 'where-we-are-map';
  }

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished 
      if (isScriptLoadSucceed) {
        this.initMap()
      }
      else this.props.onError()
    }
  }
 
  componentDidMount () {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props
    if (isScriptLoaded && isScriptLoadSucceed) {
      this.initMap()
    }
  }

  initMap() {
    const map = new window.google.maps.Map(document.getElementById(this.id), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }

  render() {
    return (
      <div id={this.id} />;
    );
  }

}

const loader = scriptLoader(
  `https://maps.googleapis.com/maps/api/js?key=${GoogleMapAPIKey}`
)(WhereWeAre);

export { loader as WhereWeAre};
export default loader;
