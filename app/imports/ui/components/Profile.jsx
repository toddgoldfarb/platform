import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import LogoutButton from './LogoutButton.jsx';
import ProfileEvents from './ProfileEvents.jsx';
import CreateEventButton from './CreateEventButton.jsx';
import {
  Button,
  Item,
  Label,
  Segment,
} from 'semantic-ui-react';
import Markdown from './Markdown';

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedEventId: null,
    };
    this.handleClickEvent = this.handleClickEvent.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleClickEvent(ee) {
    this.setState({ selectedEventId: ee._id });
  }

  handleCloseModal() {
    this.setState({ selectedEventId: null });
  }

  render() {
    if (this.props.notFound) {
      return <div>User not found</div>;
    }

    const user = this.props.user;

    const roles = (user.roles || []).map(role => (
      <Label key={role}>{role}</Label>
    ));

    const admin = Roles.userIsInRole(Meteor.userId(), 'admin');

    return (
      <div>
        <Segment style={{ marginTop: '2em' }}>
          <Item.Group divided>
            <Item>
              <Item.Image src={user.avatar} />
              <Item.Content>
                <Button.Group floated="right">
                  {admin && !this.context.isMobile && (
                     <Link to={`/admin/users/${user.username}`}>
                       <Button
                         basic
                         negative
                         content="Edit as Admin"
                       />
                     </Link>
                  )}
                  {user.self && !this.context.isMobile && (
                     <Link to="/me/edit">
                       <Button basic content="Edit" />
                     </Link>
                  )}
                  {user.self && <LogoutButton />}
                </Button.Group>
                <Item.Header as="h1">
                  {user.name}
                </Item.Header>
                <Item.Meta>{user.location}</Item.Meta>
                <Item.Description>
                  <Markdown content={user.description} />
                </Item.Description>
                <Item.Extra>{roles}</Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
          {user.self && !this.context.isMobile && <CreateEventButton />}
        </Segment>

        <ProfileEvents
          upcomingEvents={user.upcomingEvents}
          pastEvents={user.pastEvents}
          libraryEvents={user.libraryEvents}
          draftEvents={user.draftEvents}
        />

      </div>
    );
  }
}

Profile.propTypes = {
  fullName: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.string,
  avatar: PropTypes.string,

  user: PropTypes.object,

  notFound: PropTypes.bool,
  events: PropTypes.array,
  loading: PropTypes.bool,
  menuItems: PropTypes.array,
  activeItem: PropTypes.string,
};

Profile.contextTypes = {
  isMobile: React.PropTypes.bool.isRequired,
};
