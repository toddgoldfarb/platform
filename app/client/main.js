import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/routes.jsx';
import '../imports/startup/client';

import '../imports/ui/styles/semantic-ui/semantic.css';
import '../imports/ui/styles/semantic-ui/semantic.js';

import '../imports/ui/styles/Amplifield-Icons/style.css';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('app'));
});
