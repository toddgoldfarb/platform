import React, { PropTypes } from 'react';
import { Modal, Button, Header, List, Container } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import { plans } from '../content/plans.js';
import PurchasePlanButton from './PurchasePlanButton';


export default class BecomeLeaderModal extends React.Component {
  constructor() {
    super();
    this.onClickLearnMore = this.onClickLearnMore.bind(this);
  }

  onClickLearnMore() {
    browserHistory.push(`/promo/leader?event=${this.props.event.slug}`);
  }

  render() {
    return (
      <Modal
        open={this.props.openModal}
        onClose={this.props.onCloseModal}
      >
        <Header content="Share Your Content Publicly Today!" />
        <Modal.Content>
          <Container textAlign="justified">
            <p>
              ALL content streaming on Amplifield is hosted by a growing group
              of community leaders, and if you are someone who:
            </p>
            <List bulleted>
              <List.Item>
                Runs live teachings, podcasts or summits
              </List.Item>
              <List.Item>
                Produces beautiful music or videos
              </List.Item>
              <List.Item>
                Facilitates meditations / healing work
              </List.Item>
            </List>
            <p>
              The Amplifield is a great digital home for your transformational
              work!
            </p>
            <p>
              We ask you contribute a one-time fee of $99 to become a
              community leader, helping us build the world’s most conscious
              and compassionate digital platform!
            </p>
          </Container>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={this.onClickLearnMore} >
            Learn More
          </Button>

          <PurchasePlanButton
            plan={plans.becomeTeacherProduct}
            event={this.props.event.slug}>
            <Button
              color="green"
              content="Become Leader"
            />
          </PurchasePlanButton>
        </Modal.Actions>
      </Modal>
    );
  }
}

BecomeLeaderModal.propTypes = {
  event: PropTypes.object,
  openModal: PropTypes.bool,
  onCloseModal: PropTypes.func,
};
