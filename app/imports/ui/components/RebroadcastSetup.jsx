import React, { PropTypes } from 'react';
import { Form, Dropdown, Button } from 'semantic-ui-react';
import SelectTime from './SelectTime.jsx';
import SelectDate from './SelectDate.jsx';
import moment from 'moment';

export default class RebroadcastSetup extends React.Component {
  constructor() {
    super();

    this.dayFormat = 'YYYY-MM-DD';
    this.timeFormat = 'HH:mm';

    this.timeOptions = [{ text: 'right away', value: 5 },
                        { text: 'in five minutes', value: 5 * 60 },
                        { text: 'in half an hour', value: 30 * 60 },
                        { text: 'in one hour', value: 60 * 60 },
                        { text: 'tomorrow at this time', value: 60 * 60 * 24 },
                        { text: 'at a specific time...', value: 'custom' }];

    this.state = {
      selected: this.timeOptions[0].value,
      custom: false,
    };

    this.handleChangeDay = this.handleChangeDay.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleRebroadcast = this.handleRebroadcast.bind(this);
  }

  handleRebroadcast(ev) {
    ev.preventDefault();

    if (this.props.event.library && !this.props.isMember) {
      window.store.dispatch({ type: 'MEMBERSHIP_PAYWALL_SHOW' });
      return;
    }

    let startAt;

    if (this.state.custom) {
      startAt = this.state.startAt;
    } else {
      startAt = moment().add(this.state.selected, 'seconds').toDate();
    }

    this.props.onRebroadcast({ startAt });
  }

  handleChangeDay(ev, data) {
    this.setState({ startAt: data.value });
  }

  handleChangeTime(ev, data) {
    this.setState({ startAt: data.value });
  }


  handleSelect(_, data) {
    if (data.value === 'custom') {
      this.setState({ custom: true });
    } else {
      this.setState({ custom: false, selected: data.value });
    }
  }

  canSubmit() {
    if (this.state.custom) {
      return !!(this.state.startAt);
    }
    return true;
  }

  renderCustom() {
    return (
      <span>
        <SelectDate
          onChange={this.handleChangeDay}
          value={this.state.startAt}
        />
        {' '}
        <SelectTime
          onChange={this.handleChangeTime}
          value={this.state.startAt}
        />
      </span>
    );
  }

  renderOptions() {
    return (
      <Dropdown
        options={this.timeOptions}
        scrolling={false}
        compact
        inline
        defaultValue={this.state.selected}
        onChange={this.handleSelect}
      />
    );
  }

  render() {
    return (
      <Form>
        <Form.Field inline>
          Start {this.renderOptions()}

          {this.state.custom ? this.renderCustom() : null}

          <Button
            positive
            disabled={!this.canSubmit()}
            content="Play"
            onClick={this.handleRebroadcast}
          />
        </Form.Field>

      </Form>
    );
  }
}

RebroadcastSetup.propTypes = {
  event: PropTypes.object.isRequired,
  open: PropTypes.bool,
  trigger: PropTypes.node,
  onRebroadcast: PropTypes.func.isRequired,
  isMember: PropTypes.bool.isRequired,
};
