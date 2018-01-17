import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import TermsAndConditions from '../components/TermsAndConditions.jsx';

import {
  Container,
  Segment,
  List,
} from 'semantic-ui-react';


export default function LeaderThankyouPage(props) {
  const event = props.location.query.event;
  const user = Meteor.user();

  return (
    <div>
      <Container text>
        <Segment size="big" style={{ marginTop: '1em' }}>
          <p>
            Thank you for contributing to making our world a better place, and
             we look forward to hosting your content!. <br />
             A few things before we take you back to posting your very
             first public event:
          </p>

          <List >
            <List.Item>
              1. A receipt of payment has been sent to the email associated
              with your account.
            </List.Item>
            <List.Item>
              2. Make sure and edit your profile to make it GREAT
              (now that it’s public people will see it).
            </List.Item>
            <List.Item>
              3. Feel free to include any linkbacks / URL’s in your profile
              and event pages.
            </List.Item>
          </List>

          <p>
            Lastly, and importantly, please click the checkbox below and agree
            to our terms and conditions.  Thank you and we look forward to
            seeing you in ‘the field’!
          </p>
          <TermsAndConditions username={user.username} event={event} />
        </Segment>
      </Container>
    </div>
  );
}

LeaderThankyouPage.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.object.isRequired,
  }),
};

