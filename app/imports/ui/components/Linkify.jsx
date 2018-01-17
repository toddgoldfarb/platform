import React, { PropTypes } from 'react';
import linkifyStr from 'linkifyjs/string';

export default function Linkify({ text = '' }) {
  const fragment = linkifyStr(text, {
    target: '_blank',
  });

  return (
    <span dangerouslySetInnerHTML={{ __html: fragment }} />
  );
}

Linkify.propTypes = {
  text: PropTypes.string,
};
