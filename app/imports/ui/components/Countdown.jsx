import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import 'moment-duration-format';

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      remaining: this.betweenNowAndDate(props.date),
    };
  }

  componentWillMount() {
    this.intervalHandle = setInterval(() => {
      let remaining;
      if (this.state.remaining.asSeconds() >= 1) {
        remaining = this.state.remaining.subtract(1, 'second');
      } else {
        remaining = moment.duration(0);
      }

      this.setState({ remaining });
    }, 1000);
  }

  componentWillReceiveProps(props) {
    this.setState({ remaining: this.betweenNowAndDate(props.date) });
  }

  componentWillUnmount() {
    clearInterval(this.intervalHandle);
  }

  betweenNowAndDate(date) {
    const diff = new Date(date) - new Date();
    return moment.duration(diff > 0 ? diff : 0);
  }

  formattedRemaining() {
    return this.state.remaining.format(this.props.format);
  }

  render() {
    return (
      <span>{this.formattedRemaining()}</span>
    );
  }
}

Countdown.propTypes = {
  date: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired,
};

Countdown.defaultProps = {
  format: 'y[y] : M[m] : w[w] : d[d] : h[h] : mm[m] : ss[s]',
};

export default Countdown;
