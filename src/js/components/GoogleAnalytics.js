/* global ga, jQuery */
import React from 'react';

function trackOpenPhoneBackModal() {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Visszahívás',
    eventAction: 'click',
    eventLabel: 'Popup megnyitása'
  });
}

function trackSubmitPhoneBackEvent() {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Visszahívás',
    eventAction: 'click',
    eventLabel: 'Visszahívás elküldése'
  });      
}

function trackSubmitPhoneBackEventSuccess() {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Visszahívás',
    eventAction: 'click',
    eventLabel: 'Visszahívás elküldése - sikeres'
  });
}

function trackSubmitPhoneBackEventFailure() {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Visszahívás',
    eventAction: 'click',
    eventLabel: 'Visszahívás elküldése - sikertelen'
  });
}    

function trackHowWeWorkEvent(evt, data) {
  var title = data.title || 'Hibás elem';
  ga('send', {
    hitType: 'event',
    eventCategory: 'Product',
    eventAction: 'click',
    eventLabel: title
  });
}

function trackOpenAppointmentModal() {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Konzultáció foglalása',
    eventAction: 'click',
    eventLabel: 'Popup megnyitása'
  });
}

function trackSubmitAppointmentEvent() {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Konzultáció foglalása',
    eventAction: 'click',
    eventLabel: 'Konzultáció foglalás elküldése'
  });      
}

function trackSubmitAppointmentEventSuccess() {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Konzultáció foglalása',
    eventAction: 'click',
    eventLabel: 'Konzultáció foglalás elküldése - sikeres'
  });
}

function trackSubmitAppointmentEventFailure() {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Konzultáció foglalása',
    eventAction: 'click',
    eventLabel: 'Konzultáció foglalás elküldése - sikertelen'
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

export { 
  GoogleAnalytics, 
  trackOpenPhoneBackModal, 
  trackSubmitPhoneBackEvent, 
  trackSubmitPhoneBackEventSuccess, 
  trackSubmitPhoneBackEventFailure, 
  trackHowWeWorkEvent,
  trackOpenAppointmentModal,
  trackSubmitAppointmentEvent,
  trackSubmitAppointmentEventSuccess,
  trackSubmitAppointmentEventFailure
};
export default GoogleAnalytics;