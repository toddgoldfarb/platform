import React, { PropTypes } from 'react';
import { Container, Menu, Grid } from 'semantic-ui-react';
import DesktopHeaderContainer from '../containers/DesktopHeaderContainer.jsx';
import { Link } from 'react-router';
import { adminEventQueries } from '../../api/easy_events/adminEventQueries.js';

const AdminEventsNav = () => {
  const items = Object.keys(adminEventQueries).map(k => {
    return (
      <Menu.Item
        key={k}
        as={Link}
        to={`/admin/events?filter=${k}`}
        activeClassName="active"
        name={k}
      />
    );
  });
  return (
    <Menu.Item>
      <Menu.Header>Events</Menu.Header>
      <Menu.Menu>
        {items}
      </Menu.Menu>
    </Menu.Item>
  );
};

const AdminContentNav = () => (
  <Menu.Item>
    <Menu.Header>Content</Menu.Header>
    <Menu.Menu>
      <Menu.Item
        as={Link}
        to="/admin/files/audio"
        activeClassName="active"
        name="Audio"
      />
      <Menu.Item
        as={Link}
        to="/admin/files/image"
        activeClassName="active"
        name="Image"
      />
    </Menu.Menu>
  </Menu.Item>
);

const AdminAdvancedNav = () => (
  <Menu.Item>
    <Menu.Header>Advanced</Menu.Header>
    <Menu.Menu>
      <Menu.Item
        name="Database"
        as={Link}
        to="/admin/database"
      />
      <Menu.Item
        name="Users"
        as={Link}
        to="/admin/users"
      />
    </Menu.Menu>
  </Menu.Item>
);

const AdminPageLayout = ({ children }) => {
  return (
    <Container className="admin">
      <DesktopHeaderContainer />
      <Grid>
        <Grid.Column width={2}>
          <Menu vertical fluid pointing>
            <AdminEventsNav />
            <AdminContentNav />
            <AdminAdvancedNav />
          </Menu>
        </Grid.Column>
        <Grid.Column width={14}>
          {children}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

AdminPageLayout.propTypes = {
  children: PropTypes.node,
};

export default AdminPageLayout;
