/* global $ */
import React from 'react';
import moment from 'moment'

const host = 'http://localhost:8095/';
const endPoint='fetch/appointments';

class AppointmentTimePicker extends React.Component {

  constructor(props) {
    super(props);
    this.formId = this.props.formId;

    this.state = {
      appointments: {},
      slots: []
    };

    this.fetchAppointments = this.fetchAppointments.bind(this);
    this.pickDate = this.pickDate.bind(this);
  }

  componentDidMount() {
    this.fetchAppointments();
  }

  fetchAppointments() {
    fetch(host + endPoint)
    .then(result => result.json())
    .then(appointments => this.setState({ appointments, slots: [] }))
    .then(() => {
      const $form = $(`#${this.props.formId}`);
      const dates = Object.keys(this.state.appointments);
      const endDate = this.calculateEndDate(dates);
      const datesDisabled = this.calculateDatesDisabled(dates, endDate);
  
      console.log('disabledDates: ' + JSON.stringify(datesDisabled));
  
      $form.find('.datepicker')
        .datepicker({
          startDate: 'today',
          endDate,
          todayHighlight: this.hasFreeSlot(moment().format('YYYY-MM-DD')),
          language: 'hu',
          datesDisabled
        })
        .on('changeDate', this.pickDate); 
    })

    /*
    return {
      '2018-03-27': {
        '10:00 - 12:00': 'free',
        '13:00 - 15:00': 'reserved',
        '16:00 - 18:00': 'free'
      },
      '2018-03-28': {
        '10:00 - 12:00': 'free',
        '13:00 - 15:00': 'free'
      },
      '2018-03-29': {
        '10:00 - 12:00': 'free',
        '13:00 - 15:00': 'free',
        '16:00 - 18:00': 'free'
      },
      '2018-03-30': {
        '10:00 - 12:00': 'reserved',
        '13:00 - 15:00': 'reserved',
        '16:00 - 18:00': 'reserved'
      }
    }
    // */
  }

  calculateEndDate(dates) {
    if (!dates.length) {
      return undefined;
    }

    return dates.reduce((m, i) => (i > m) && i || m, '');
  }

  hasFreeSlot(currentDate) {
    if (!this.state.appointments.hasOwnProperty(currentDate)) {
      return false;
    }

    const currentSlot = this.state.appointments[currentDate];
    return Object.keys(currentSlot).some(key => currentSlot[key] === 'free')
  }

  calculateDatesDisabled(dates, endDateString) {
    if (!dates.length) {
      return [];
    }

    let datesDisabled = [];
    let currentDate = moment().startOf('day');
    let endDate = moment(endDateString).startOf('day');
    console.log(`currentDate: ${currentDate}`);
    console.log(`endDate: ${endDate}`);
    while (currentDate <= endDate) {
      const currentDateString = currentDate.format('YYYY-MM-DD');
      if (!this.hasFreeSlot(currentDateString)) {
        datesDisabled.push(currentDateString);
      }
      currentDate = moment(currentDate).add(1, 'day');
    }
    return datesDisabled;
  }

  pickDate(e) {
    const origDate = e.date;
    console.log(`orig date: ${origDate}`);
    const pickedDate = moment(origDate).format('YYYY-MM-DD');
    console.log(`selected date: ${pickedDate}`);
    this.setState({
      slots: this.state.appointments.hasOwnProperty(pickedDate)
        ? Object.keys(this.state.appointments[pickedDate]).filter(
          slot => this.state.appointments[pickedDate][slot] === 'free')
        : []
    });
    this.props.onPickDate(pickedDate);

    const $form = $(`#${this.formId}`);
    const $appointmentButtons = $form.find('.datepicker-container button');
    $appointmentButtons.click(evt => {
      const $elm = $(evt.target);
      if (!$elm.hasClass('disabled')) {
        $appointmentButtons.removeClass('selected');
        $elm.addClass('selected');
        this.props.onPickSlot($elm[0].textContent);
      }
    });
  }

  renderSlots() {
    return (
      <div className='col-xs-12 col-md-6'>
        {
          this.state.slots.map((slot =>
              <button
                aria-label="appointment slot"
                class="btn outline"
                type="button"
                key={slot}>
                {slot}
              </button>))
        }
      </div>
    );
  }

  render() {
    return (
      <div className='form-group row datepicker-container'>
        <div className='col-xs-12 col-md-6 input-box'>
          <div className='datepicker' />
        </div>
          { this.renderSlots() }
      </div>)
  };

}

export { AppointmentTimePicker };
export default AppointmentTimePicker;