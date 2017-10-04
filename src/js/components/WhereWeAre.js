/* global window */
import React, { Component } from 'react'
import scriptLoader from 'react-async-script-loader';

const GoogleMapAPIKey = 'AIzaSyAFbBhRbW0SqBuFGANi-MdGh__Up9_smiw';

class WhereWeAre extends Component {

  constructor(props) {
    super(props);
    this.id = 'whereweare';
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
    const pos = {
      lat: this.props.lat || 66,
      lng: this.props.lng || -66
    };
    const map = new window.google.maps.Map(document.getElementById(this.id), {
      center: pos,      
      zoom: 16
    });
    return new window.google.maps.Marker({
      position: pos,
      map: map
    });
  }

  render() {
    return (
      <div id={this.id} className="where-we-are-container" />
    );
  }

}

const loader = scriptLoader(
  `https://maps.googleapis.com/maps/api/js?key=${GoogleMapAPIKey}`
)(WhereWeAre);

export { loader as WhereWeAre};
export default loader;
