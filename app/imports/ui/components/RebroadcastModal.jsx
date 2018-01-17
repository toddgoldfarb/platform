import React, { PropTypes } from 'react';
import { Form, Dropdown, Icon, Modal, Button, Header, Message } from 'semantic-ui-react';
import SelectTime from './SelectTime.jsx';
import SelectDate from './SelectDate.jsx';
import moment from 'moment';

export default class RebroadcastModal extends React.Component {
  constructor() {
    super();

    this.dayFormat = 'YYYY-MM-DD';
    this.timeFormat = 'HH:mm';

    this.state = {
      selected: 60,
      custom: false,
    };

    this.handleChangeDay = this.handleChangeDay.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleRebroadcast = this.handleRebroadcast.bind(this);
  }

  handleRebroadcast() {
    if (!this.props.isMember) {
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
        options={[{ text: 'in one minute', value: 60 },
                  { text: 'in five minutes', value: 5 * 60 },
                  { text: 'in half an hour', value: 30 * 60 },
                  { text: 'in one hour', value: 60 * 60 },
                  { text: 'tomorrow at this time', value: 60 * 60 * 24 },
                  { text: 'at a specific time...', value: 'custom' }]}
        scrolling={false}
        compact
        inline
        defaultValue={this.state.selected}
        onChange={this.handleSelect}
      />
    );
  }

  render() {
    const { event } = this.props;

    return (
      <Modal
        closeIcon="close"
        open={this.props.open}
        trigger={this.props.trigger}
      >
        <Modal.Header>
          <h2>Rebroadcast: {event.title}</h2>
        </Modal.Header>
        <Modal.Content>
          <Message icon>
            <Icon name="retweet" />
            <Message.Content>
              Rebroadcasting this event opens a new player where you
              can listen by yourself (cool) or invite friends to share
              the experience (cooler)!
            </Message.Content>
          </Message>

          Start the event {this.renderOptions()}

          <Form>
            <Form.Field inline>
              {this.state.custom ? this.renderCustom() : null}
            </Form.Field>
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button
            positive
            disabled={!this.canSubmit()}
            content="Rebroadcast Event"
            onClick={this.handleRebroadcast}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

RebroadcastModal.propTypes = {
  event: PropTypes.object.isRequired,
  open: PropTypes.bool,
  trigger: PropTypes.node,
  onRebroadcast: PropTypes.func.isRequired,
  isMember: PropTypes.bool.isRequired,
};
