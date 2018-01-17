import React, { PropTypes } from 'react';

export default class InputIntention extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(ev) {
    this.setState({ value: ev.target.value });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.postIntention(this.state.value)
        .then(() => {
          this.setState({ value: '' });
        }).catch((error) => {
          console.log({ error }); // eslint-disable-line
        });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="ui input fluid input-intention">
          <input
            type="text"
            value={this.state.value}
            placeholder="Discuss and Chat..."
            onChange={this.handleChange}
          />
        </div>
      </form>
    );
  }
}

InputIntention.propTypes = {
  postIntention: PropTypes.func,
};
