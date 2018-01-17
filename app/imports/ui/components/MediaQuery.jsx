// see
// https://facebook.github.io/react/docs/context.html#updating-context
// and linked blogpost... this solution is limited

import React from 'react';

export default class MediaQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { type: 'desktop' };
  }

  getChildContext() {
    return { isMobile: this.state.type === 'mobile' };
  }

  componentDidMount() {
    const checkMediaQuery = () => {
      const type = window.matchMedia('(min-width: 1025px)').matches ? 'desktop' : 'mobile';
      if (type !== this.state.type) {
        this.setState({ type });
      }
    };

    window.addEventListener('resize', checkMediaQuery);
    checkMediaQuery();
  }

  render() {
    return this.props.children;
  }
}

MediaQuery.childContextTypes = {
  isMobile: React.PropTypes.bool,
};

MediaQuery.propTypes = {
  children: React.PropTypes.node,
};
