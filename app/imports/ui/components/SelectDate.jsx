import React, { PropTypes } from 'react';
import { Input, Modal } from 'semantic-ui-react';
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';
import './DayPicker.css';

export default class SelectDate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      month: new Date(),
    };

    this.handleDayClick = this.handleDayClick.bind(this);
  }

  handleDayClick(ev, day, { /* selected, */ disabled }) {
    ev.preventDefault();
    if (disabled) {
      return;
    }
    if (this.props.onChange) {
      const selectedDayStr = moment(day).format('YYYY-MM-DD');
      const originalTimeStr = this.props.value ? moment(this.props.value).format('HH:mm') : '12:00';

      this.props.onChange(ev, {
        name: this.props.name,
        value: moment(`${selectedDayStr} ${originalTimeStr}`,
                      'YYYY-MM-DD HH:mm').toDate(),
      });
    }

    this.setState({ isOpen: false });
  }

  render() {
    const selectedDay = this.props.value;
    const initialMonth = this.props.value ? selectedDay : new Date();

    const input = (
      <Input
        icon="calendar"
        placeholder="Pick a day"
        onFocus={() => this.setState({ isOpen: true })}
        value={this.props.value ? moment(this.props.value).format('YYYY-MM-DD') : ''}
        onChange={() => {}}
      />
    );

    return (
      <Modal
        trigger={input}
        open={this.state.isOpen}
        onClose={() => this.setState({ isOpen: false })}
      >
        <Modal.Header>
          Pick a Day
        </Modal.Header>
        <Modal.Content>
          <DayPicker
            selectedDays={day => DateUtils.isSameDay(selectedDay, day)}
            initialMonth={initialMonth}
            onDayClick={this.handleDayClick}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

SelectDate.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Date),
  name: PropTypes.string,
};
