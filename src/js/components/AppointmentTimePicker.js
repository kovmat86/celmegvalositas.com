/* global $ */
import React from 'react';
import moment from 'moment';
import _ from 'lodash';

class AppointmentTimePicker extends React.Component {

  constructor(props) {
    super(props);
    this.formId = this.props.formId;

    this.state = {
      slots: []
    };

    this.pickDate = this.pickDate.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (_.isEmpty(prevProps.appointments) && !_.isEmpty(this.props.appointments)) {
      const $form = $(`#${this.props.formId}`);
      const dates = Object.keys(this.props.appointments);
      const endDate = this.calculateEndDate(dates);
      const datesDisabled = this.calculateDatesDisabled(dates, endDate);

      $form.find('.datepicker')
        .datepicker({
          startDate: 'today',
          endDate,
          todayHighlight: this.hasFreeSlot(moment().format('YYYY-MM-DD')),
          language: 'hu',
          datesDisabled
        })
        .on('changeDate', this.pickDate);
    } else {
      if (!_.isEqual(prevProps.appointments, this.props.appointments)) {
        this.setState({slots: []});
      }
    }
  }

  calculateEndDate(dates) {
    if (!dates.length) {
      return undefined;
    }

    return dates.reduce((m, i) => (i > m) && i || m, '');
  }

  hasFreeSlot(date) {
    if (!this.props.appointments.hasOwnProperty(date)) {
      return false;
    }

    const slot = this.props.appointments[date];
    return Object.keys(slot).some(key => slot[key] === 'free');
  }

  calculateDatesDisabled(dates, endDateString) {
    if (!dates.length) {
      return [];
    }

    let datesDisabled = [];
    let currentDate = moment().startOf('day');
    let endDate = moment(endDateString).startOf('day');
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
    const pickedDate = moment(origDate).format('YYYY-MM-DD');
    this.setState({
      slots: this.props.appointments.hasOwnProperty(pickedDate)
        ? Object.keys(this.props.appointments[pickedDate]).filter(
          slot => this.props.appointments[pickedDate][slot] === 'free')
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