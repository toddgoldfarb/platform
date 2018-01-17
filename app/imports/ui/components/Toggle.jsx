import React, { PropTypes } from 'react';
import { Dropdown, Header } from 'semantic-ui-react';
import BecomeLeaderModal from './BecomeLeaderModal.jsx';


export default class Toggle extends React.Component {
  constructor() {
    super();
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  componentWillMount() {
    this.setState({ openModal: false });
  }

  onChangeHandler(_, { value }) {
    if (this.props.field === 'isPublic' && !this.props.isTeacher && value === 1) {
      this.setState({ openModal: true });
    } else {
      this.props.onToggle(this.props.field, !!value);
    }
  }

  onCloseModal() {
    this.setState({ openModal: false });
  }

  render() {
    const options = this.props.options.map(({ text, value, icon, subheader }) => (
      {
        text,
        value,
        content: <Header icon={icon} content={text} subheader={subheader} />,
      }));


    return (
      <div>
        <Dropdown
          button
          fluid
          value={this.props.event[this.props.field] ? 1 : 0}
          onChange={this.onChangeHandler}
          options={options}
        />
        <BecomeLeaderModal
          event={this.props.event}
          openModal={this.state.openModal}
          onCloseModal={this.onCloseModal} />
      </div>
    );
  }
}

Toggle.propTypes = {
  event: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  isTeacher: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    subheader: PropTypes.string.isRequired,
  })).isRequired,
};
