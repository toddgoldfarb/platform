import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import {
  Button,
  Input,
  Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router';
import Toggle from './Toggle.jsx';


export default class EventSettings extends React.Component {

  render() {
    if (!this.props.event) {
      return null;
    }
    const path = `${this.props.event.username}/${this.props.event.slug}`;

    return (
      <div>
        <Segment>
          <Toggle
            event={this.props.event}
            isTeacher={this.props.isTeacher}
            field="isPublic"
            options={[{
              text: 'Public Event',
              value: 1,
              icon: 'rss',
              subheader: 'Will be listed in the public calendar',
            }, {
              text: 'Private Event',
              value: 0,
              icon: 'circle outline',
              subheader: 'Only accessible to those with link',
            }]}
            onToggle={this.props.onToggle}
          />

          <br />

          <Toggle
            event={this.props.event}
            field="marketing"
            options={[{
              text: 'Marketing',
              value: 1,
              icon: 'line graph',
              subheader: 'Have event included in Amplifield Marketing Program',
            }, {
              text: 'No Marketing',
              value: 0,
              icon: 'circle outline',
              subheader: 'Basic listings in event calendar or library only',
            }]}
            onToggle={this.props.onToggle}
          />

        </Segment>

        <Segment>
          <Button
            fluid
            primary={!this.props.event.published}
            onClick={() => this.props.onToggle('published', !this.props.event.published)}
          >
            {this.props.event.published ? 'Unpublish' : 'Publish Event'}
          </Button>

          <br />

          {this.props.event.published && (
             <Link to={`/${path}`}>
               <Button fluid positive>
                 Visit Published Event Page
               </Button>
             </Link>
           )}

        <br />
        <div>Shareable link to event:</div>
        <Input
          size="large"
          fluid
          value={Meteor.absoluteUrl(path)}
          readOnly
        />

        </Segment>
      </div>
    );
  }
}

EventSettings.propTypes = {
  event: PropTypes.object.isRequired,
  isTeacher: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};
