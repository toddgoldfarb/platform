import { Icon } from 'semantic-ui-react';
import { PropTypes } from 'react';
import { Console } from '../../util/console.js';

const AmpIcon = Icon;

// semantic-ui-react strictly checks the value of the icon name
// resulting in noisy console errors in development when referencing
// icons from phong's amp set.  The following code relaxes that
// checking.
if (AmpIcon.propTypes && AmpIcon.propTypes.name) {
  AmpIcon.propTypes.name = PropTypes.string.isRequired;

  Console.warn('relaxing Icon.propType.name checking');
}

export default AmpIcon;
