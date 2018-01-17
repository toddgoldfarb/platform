import React, { PropTypes } from 'react';
import MobileNavContainer from '../containers/MobileNavContainer.jsx';
import DesktopHeaderContainer from '../containers/DesktopHeaderContainer.jsx';
import PurchasePlanButton from '../components/PurchasePlanButton';
import { plans } from '../content/plans.js';

import {
  Container,
  Header,
  Segment,
  List,
  Embed,
} from 'semantic-ui-react';


export default function PromoLeaderPage(props, context) {
  const event = props.location.query.event;
  return (
    <div>
      {!context.isMobile && <DesktopHeaderContainer />}
      <Container text>
        <Segment size="big" style={{ marginTop: '1em' }}>

          <Header size="large" textAlign="center">
            Become Amplifield Community Leader!
          </Header>

          <p>
            ALL content streaming on our platform is hosted by a growing
            group of community leaders, and if you are someone who:
          </p>

          <List bulleted>
            <List.Item>
              Runs live teachings, podcasts or summits.
            </List.Item>
            <List.Item>
              Produces beautiful music or videos.
            </List.Item>
            <List.Item>
              Facilitates meditations / healing work.
            </List.Item>
          </List>

          <p>
            ...than perhaps The Amplifield is a great digital home for your
            transformational work!
          </p>
          <p>
            You’ll benefit greatly by being part of our growing community of
            awesome leaders + your followers will garner a better experience
            of your work via our one-of-a-kind ‘social’ player. Please watch
            this video which describes the opportunity in greater detail:
          </p>
          <p>
            <Embed
             id="rWuUMyZeuhQ"
             source="youtube"
             active
             autoplay={false}
             />
          </p>
          <p>
            <PurchasePlanButton
              plan={plans.becomeTeacherProduct}
              event={event}>
              <a style={{ cursor: 'pointer' }}>Click Here</a>
            </PurchasePlanButton>
            &nbsp;to register and begin posting your own public events
            today!
          </p>
          <p>
            We anticipate millions of people soon playing in ‘our field’
            helping to accelerate the qualities of love, kindness and
            peace in our world.
          </p>
          <p>
            <PurchasePlanButton
              plan={plans.becomeTeacherProduct}
              event={event}>
              <a style={{ cursor: 'pointer' }}>Join in Today!</a>
            </PurchasePlanButton>
            &nbsp;Thanks and we can’t wait to ‘see you in The Field’
          </p>
          <p>
            Todd Jason <br />
            Founder, Amplifield
          </p>
        </Segment>
      </Container>
      {context.isMobile && <MobileNavContainer />}
    </div>
  );
}

PromoLeaderPage.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.object.isRequired,
  }),
};


PromoLeaderPage.contextTypes = {
  isMobile: PropTypes.bool.isRequired,
};
