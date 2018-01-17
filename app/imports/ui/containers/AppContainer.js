import { composeWithTracker } from 'react-komposer';
import App from '../layouts/App.jsx';

const appComposer = (props, onData) => {
  window.analytics.page();
  onData(null, { });
};

export default composeWithTracker(appComposer)(App);
