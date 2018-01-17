import React, { PropTypes } from 'react';
import { Dropdown } from 'semantic-ui-react';
import moment from 'moment';

export default class SelectTime extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      times: [
        '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
        '20:00', '21:00', '22:00', '23:00',
      ],
    };

    this.handleAddition = this.handleAddition.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  options() {
    const times = this.state.times.slice(0);
    const str = this.valueAsString();
    if (str && str.length && times.indexOf(str) === -1) {
      times.push(str);
    }
    return times
      .sort()
      .map((value) => {
        const text = this.asText(this.parse(value));
        return { value, text };
      });
  }

  parse(str) {
    const m = moment(str, ['h', 'hmm', 'h:mm', 'h:mm a', 'hmm a']);
    return m.isValid() && m;
  }

  asText(m) {
    return m && m.format('h:mm a');
  }

  asValue(m) {
    return m && m.format('HH:mm');
  }

  addTime(str) {
    const m = this.parse(str);
    if (m) {
      const time = this.asValue(m);
      if (this.state.times.indexOf(time) === -1) {
        this.setState({ times: [time, ...this.state.times] });
      }
    }
  }

  handleAddition(_, { value }) {
    this.addTime(value);
  }

  handleChange(ev, { value }) {
    if (this.props.onChange) {
      const originalDayStr = moment(this.props.value).format('YYYY-MM-DD');

      this.props.onChange(ev, {
        name: this.props.name,
        value: moment(`${originalDayStr} ${value}`,
                      'YYYY-MM-DD HH:mm').toDate(),
      });
    }
  }

  valueAsString() {
    if (this.props.value) {
      return moment(this.props.value).format('HH:mm');
    }
    return '';
  }

  render() {
    return (
      <Dropdown
        options={this.options()}
        placeholder="Pick a time"
        search
        selection
        value={this.valueAsString()}
        allowAdditions
        additionLabel=""
        additionPosition="top"
        onAddItem={this.handleAddition}
        onChange={this.handleChange}
      />
    );
  }
}

SelectTime.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Date),
  name: PropTypes.string,
};
