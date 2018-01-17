import React, { PropTypes } from 'react';
import { Container } from 'semantic-ui-react';
import FilteredEventList from './FilteredEventList.jsx';
import EventModalContainer from '../containers/EventModalContainer.js';
import HeaderIcon from './HeaderIcon.jsx';
import HeadlineBlock from './HeadlineBlock.jsx';
import { browserHistory } from 'react-router';

export default class Explore extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedEventId: null,
    };
    this.handleClickEvent = this.handleClickEvent.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleClickEvent(ee) {
    this.setState({ selectedEventId: ee._id });
    browserHistory.push(`/${ee.username}/${ee.slug}`);
  }

  handleCloseModal() {
    this.setState({ selectedEventId: null });
  }

  render() {
    return (
      <Container fluid>
        <HeaderIcon {...this.props.headingProps} />
        <Container text>
          <div>
            {this.props.headliners.map(h => (
               <HeadlineBlock
                 key={h.title}
                 title={h.title}
                 events={h.events}
                 onClickEvent={this.handleClickEvent}
               />
             ))}
          </div>
          <FilteredEventList
            loading={this.props.loading}
            menuItems={this.props.menuItems}
            activeItem={this.props.activeItem}
            events={this.props.events}
            onClickEvent={this.handleClickEvent}
          />
          <EventModalContainer
            eventId={this.state.selectedEventId}
            open={!!this.state.selectedEventId}
            onClose={this.handleCloseModal}
          />
        </Container>
      </Container>
    );
  }
}

Explore.propTypes = {
  events: PropTypes.array,
  headliners: PropTypes.array.isRequired,
  menuItems: PropTypes.array.isRequired,
  activeItem: PropTypes.string.isRequired,
  headingProps: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};

Explore.contextTypes = {
  router: PropTypes.object.isRequired,
};
