import React, { PropTypes } from 'react';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import ProviderListContainer from '../containers/ProviderListContainer';
import TrackListWithData from '../containers/TrackListWithData';
import HeaderIcon from '../components/HeaderIcon.jsx';
import { Link } from 'react-router';
import {
  Button,
  Container,
  Menu,
  Message,
} from 'semantic-ui-react';

export default class Membership extends React.Component {
  constructor() {
    super();

    this.state = {
      activeItem: 'providers',
    };
  }

  renderThankyou() {
    if (this.props.thankyou) {
      return (
        <Message positive>
          <Message.Header>
            Thank you!
          </Message.Header>
          <p>
            You are now an annual member and can enjoy unlimited access to all library content
          </p>
        </Message>
      );
    }
    return null;
  }

  renderMemberMessage() {
    if (Roles.userIsInRole(Meteor.userId(), 'iawake-member')) {
      return null;
    }
    return (
      <Message>
        <Link to="/promo">
          <Button primary floated="right" size="tiny">Learn More</Button>
        </Link>
        <Message.Header>
          Limited Time Offer
        </Message.Header>
        <p>
          Become a member and enjoy unlimited access to all library content!
        </p>
      </Message>
    );
  }

  renderContent() {
    if (this.state.activeItem === 'providers') {
      return <ProviderListContainer />;
    }

    return <TrackListWithData />;
  }

  render() {
    return (
      <Container fluid>
        <HeaderIcon
          icon="amp-headphones"
          title="Library"
          subTitle={`An assortment of meditation music, guided practices, and
teachings you can stream anywhere, anytime.`}
        />
        <Container text>
          {this.renderThankyou()}
          {this.renderMemberMessage()}
          <div className="ui filter-menu" style={{ paddingTop: '2em' }}>
            <Menu fluid secondary pointing widths={2}>
              <Menu.Item
                key="providers"
                name="Packages"
                active={this.state.activeItem === 'providers'}
                onClick={() => this.setState({ activeItem: 'providers' })}
              />
              <Menu.Item
                key="tracks"
                name="Tracks"
                active={this.state.activeItem === 'tracks'}
                onClick={() => this.setState({ activeItem: 'tracks' })}
              />
            </Menu>
            <div className="ui discover-event-list">
              {this.renderContent()}
            </div>
          </div>
        </Container>
      </Container>
    );
  }
}

Membership.propTypes = {
  thankyou: PropTypes.bool.isRequired,
};
