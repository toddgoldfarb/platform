import React, { PropTypes } from 'react';
import { Message } from 'semantic-ui-react';

const PageMessage = ({ color, header, content }) => {
  if (!content) {
    return null;
  }
  return (
    <Message floating color={color}>
      <Message.Content>
        <Message.Header>{header}</Message.Header>
        <p>{content}</p>
      </Message.Content>
    </Message>
  );
};
PageMessage.propTypes = {
  color: PropTypes.string,
  header: PropTypes.string,
  content: PropTypes.string,
};

export default PageMessage;
