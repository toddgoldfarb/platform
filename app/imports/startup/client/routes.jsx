import React from 'react';

// react router
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

// redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { appReducer } from '../../ui/reducers';

// apollo/graphql
import { ApolloProvider } from 'react-apollo';
import { apolloClient } from '../../api/apollo/apolloClient';

// route components
import PromoPage from '../../ui/pages/PromoPage';
import PromoLeaderPage from '../../ui/pages/PromoLeaderPage';
import LeaderThankyouPage from '../../ui/pages/LeaderThankyouPage';
import AppContainer from '../../ui/containers/AppContainer.js';
import AuthContainer from '../../ui/containers/AuthContainer.js';
import AdminEventsPageContainer from '../../ui/containers/AdminEventsPageContainer.js';
import AdminEventPageContainer from '../../ui/containers/AdminEventPageContainer.js';
import AdminFilesPageContainer from '../../ui/containers/AdminFilesPageContainer.js';
import AdminDatabasePage from '../../ui/pages/AdminDatabasePage.jsx';
import AdminUsersPageWithData from '../../ui/containers/AdminUsersPageWithData.js';
import AdminUserPageContainer from '../../ui/containers/AdminUserPageContainer.js';
import AdminPageLayout from '../../ui/layouts/AdminPageLayout.jsx';
import PlayerPageWithData from '../../ui/containers/PlayerPageWithData.js';
import CreateEventPageContainer from '../../ui/containers/CreateEventPageContainer.js';
import ManageEventPageContainer from '../../ui/containers/ManageEventPageContainer.js';
import EditEventPageContainer from '../../ui/containers/EditEventPageContainer.js';

import TeachersPageWithData from '../../ui/containers/TeachersPageWithData.js';

import MembershipPage from '../../ui/pages/MembershipPage.jsx';

import ExplorePageWithData from '../../ui/containers/ExplorePageWithData.js';

import ProfilePageWithData from '../../ui/containers/ProfilePageWithData.js';
import EditProfilePageContainer from '../../ui/containers/EditProfilePageContainer.js';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';

const store = createStore(appReducer);
window.store = store;

window.routeUpdates = 0;

export const renderRoutes = () => (
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <Router history={browserHistory} onUpdate={() => window.routeUpdates++} >
        <Route path="/" component={AppContainer}>
          <Route path="promo" component={PromoPage} />
          <Route path="promo/leader" component={PromoLeaderPage} />
          <Route path="leader/thankyou" component={LeaderThankyouPage} />

          <Route component={AuthContainer}>
            <IndexRedirect to="/explore/temple" />

            <Route path="admin" component={AdminPageLayout}>
              <IndexRedirect to="/admin/events" />
              <Route path="events" component={AdminEventsPageContainer} />
              <Route path="event/:eventId" component={AdminEventPageContainer} />
              <Route path="files/:basicType" component={AdminFilesPageContainer} />
              <Route path="database" component={AdminDatabasePage} />
              <Route path="users" component={AdminUsersPageWithData} />
              <Route path="users/:username" component={AdminUserPageContainer} />
            </Route>

            <Route path="teachers" component={TeachersPageWithData} />

            <Route path="membership" component={MembershipPage} />

            <Route path="explore/temple" component={ExplorePageWithData} />

            <Route path="me" component={ProfilePageWithData} />
            <Route path="me/edit" component={EditProfilePageContainer} />

            <Route path="event/new" component={CreateEventPageContainer} />

            <Route path=":username" component={ProfilePageWithData} />
            <Route path=":username/:slug" component={PlayerPageWithData} />
            <Route path=":username/:slug/manage" component={ManageEventPageContainer} />
            <Route path=":username/:slug/edit" component={EditEventPageContainer} />

          </Route>
          <Route path="*" component={NotFoundPage} />
        </Route>
      </Router>
    </Provider>
  </ApolloProvider>
);
