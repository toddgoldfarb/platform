import React, { PropTypes } from 'react';
import { Button, Dropdown } from 'semantic-ui-react';

const RSVPButton = ({ going, onRSVP, onCancel }) => {
  if (!going) {
    return (
      <Button onClick={onRSVP} color="orange" >
        I Want To Go
      </Button>
    );
  }

  return (
    <Button.Group color="green">
      <Button>I'm Going!</Button>
      <Dropdown floating button className="icon">
        <Dropdown.Menu>
          <Dropdown.Item text="Not Going" onClick={onCancel} />
        </Dropdown.Menu>
      </Dropdown>
    </Button.Group>
  );
};

RSVPButton.propTypes = {
  going: PropTypes.bool.isRequired,
  onRSVP: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default RSVPButton;
