import React, { PropTypes } from 'react';

export default class LiveEventHeading extends React.Component {
  render() {
    return (
      <div className="ui inverted violet segment">
        <h1>{this.props.title}</h1>
        <h4 className="ui teal header">
          Saturday, November 19th, 10:30AM to <br />
          Tuesday, November 22nd, 9:01pm
        </h4>
      </div>
    );
  }
}
LiveEventHeading.propTypes = {
  title: PropTypes.string.isRequired,
};
