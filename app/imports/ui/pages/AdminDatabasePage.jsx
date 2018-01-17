import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Dropdown, Button, Loader } from 'semantic-ui-react';

export default class AdminDatabasePage extends React.Component {
  constructor() {
    super();

    this.state = {
      working: false,
      result: '',
      methods: [
        'admin.sanityCheck',
        'admin.validateUsers',
        'admin.migrateUsers',
        'admin.denormalizeRSVPCounts',
        'admin.denormalizeRebroadcastCount',
        'admin.cancelMemberships',
        'admin.addUsernamestoUsers',
        'admin.addUsernamesToEvents',
        'admin.addHostNamesToEvents',
        'admin.addSlugsToEvents',
        'admin.migrateYoutubeVideoIdsToYoutubeUrl',
        'admin.addPinnedToIntentions',
      ].map(value => Object({ text: value, value })),
    };

    this.handleAddition = this.handleAddition.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.callMethod = this.callMethod.bind(this);
  }

  callMethod() {
    this.setState({ working: true });
    Meteor.call(this.state.method, (err, result) => {
      this.setState({ working: false });
      if (err) {
        window.alert(err.reason); // eslint-disable-line
        throw err;
      }

      this.setState({
        result: typeof result === 'string' ? result : JSON.stringify(result),
      });
    });
  }


  handleAddition(e, { value }) {
    this.setState({
      methods: [{ text: value, value }, ...this.state.methods],
    });
  }

  handleChange(e, { value }) {
    this.setState({ result: null, method: value });
  }

  render() {
    return (
      <div>
        <h1>Database Administration</h1>
        <Dropdown
          options={this.state.methods}
          placeholder="Choose Method"
          search
          selection
          allowAdditions
          value={this.state.method}
          onAddItem={this.handleAddition}
          onChange={this.handleChange}
        />
        <Button
          positive
          content="Call"
          disabled={!this.state.method}
          onClick={this.callMethod}
        />

        <Loader active={this.state.working} inline="centered" />

        <pre>
          {this.state.result}
        </pre>
      </div>
    );
  }
}
