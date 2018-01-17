import React, { PropTypes } from 'react';
import PurchasePlanButton from './PurchasePlanButton';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

export default function MembershipPaywallModal(props) {
  return (
    <Modal
      basic
      size="small"
      open={props.open}
      onClose={props.onClose}
    >
      <Header icon="music" content="Become a Member" />
      <Modal.Content>
        <p>Get unlimited access to ALL Amplifield content for only $79 per year!</p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="orange"
          inverted
          onClick={props.onLearnMore}
        >
          <Icon name="remove" /> Learn More
        </Button>
        <PurchasePlanButton plan={props.plan}>
          <Button
            color="green"
            inverted
          >
            <Icon name="checkmark" /> Become Member
          </Button>
        </PurchasePlanButton>
      </Modal.Actions>
    </Modal>
  );
}

MembershipPaywallModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLearnMore: PropTypes.func.isRequired,
  plan: PropTypes.object.isRequired,
};
