import React, { PropTypes } from 'react';
import {
  Button,
  Header,
  Icon,
  Modal,
} from 'semantic-ui-react';

const GestureModal = ({ open, onClick }) => (
  <Modal
    basic
    open={open}
  >
    <Header>
      Ready for Audio?
    </Header>
    <Modal.Actions>
      <Button
        positive
        onClick={onClick}
      >
        <Icon name="play" />Play
      </Button>
    </Modal.Actions>
  </Modal>
);

GestureModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GestureModal;
