/* global ga, jQuery */
import React from 'react';

function trackOpenRequestModal() {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Request an appointment',
    eventAction: 'click',
    eventLabel: 'Open'
  });
}

function trackSubmitEvent() {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Request an appointment',
    eventAction: 'click',
    eventLabel: 'Submit'
  });      
}

function trackSubmitSuccess() {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Request an appointment',
    eventAction: 'click',
    eventLabel: 'Success'
  });
}

function trackSubmitFailure() {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Request an appointment',
    eventAction: 'click',
    eventLabel: 'Error'
  });
}    

function trackProductEvent(evt, data) {
  var title = data.title || 'Invalid product';
  ga('send', {
    hitType: 'event',
    eventCategory: 'Product',
    eventAction: 'click',
    eventLabel: title
  });
}

class GoogleAnalytics extends React.Component {

  static propTypes = {
    account: React.PropTypes.string.isRequired,
    history: React.PropTypes.object,
  };

  componentDidMount() {
    window.ga = window.ga || (() => { (ga.q = ga.q || []).push(arguments); }); ga.l = +new Date;
    const account = this.props.account;
    const scriptSrc = '//google-analytics.com/analytics.js';
    jQuery.getScript(scriptSrc, () => {
      // Track Route changes
      ga('create', account, 'auto');
      ga('send', 'pageview');
      if (this.props.history) {
        this.props.history.listen((newLocation) => {
          ga('send', 'pageview', newLocation.pathname);
        });
      }
    });
  }

  render() {
    return <div key='google-analytics' />;
  }
}

export { GoogleAnalytics, trackProductEvent, trackSubmitSuccess, trackSubmitFailure, trackSubmitEvent, trackOpenRequestModal };
export default GoogleAnalytics;