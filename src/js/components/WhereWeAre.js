import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader';

const GoogleMapAPIKey = '';

class WhereWeAre extends React.Component {

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

  }

  render() {
    return null;
  }

}

const loader = scriptLoader(
  `https://maps.googleapis.com/maps/api/js?key=${GoogleMapAPIKey}`
)(WhereWeAre);

export { loader as WhereWeAre};
export default loader;
