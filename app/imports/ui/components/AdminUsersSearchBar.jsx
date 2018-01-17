import React, { Component, PropTypes } from 'react';
import { Grid, Input } from 'semantic-ui-react';

class AdminUsersSearchBar extends Component {
  constructor() {
    super();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(ev) {
    if (ev.key === 'Enter') {
      this.props.handleSearch({ username: ev.target.value });
    }
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={15}>
          <Input
            fluid
            onKeyPress={this.handleKeyPress}
            placeholder="Find user by username or email"
            size="large"
          />
        </Grid.Column>
      </Grid>
    );
  }
}

AdminUsersSearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};


export default AdminUsersSearchBar;
