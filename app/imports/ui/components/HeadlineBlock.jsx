import React, { PropTypes } from 'react';
import FeaturedEventCard from './FeaturedEventCard.jsx';
import { Button } from 'semantic-ui-react';

export default class HeadlineBlock extends React.Component {
  constructor() {
    super();

    this.state = { limit: 3 };

    this.handleClickShowMore = this.handleClickShowMore.bind(this);
  }

  handleClickShowMore() {
    this.setState({ limit: this.state.limit + 3 });
  }

  render() {
    const { title, events, onClickEvent } = this.props;

    if (!events || events.length <= 0) {
      return null;
    }

    return (
      <div>
        <h2 style={{ color: 'white', marginTop: '2em' }}>{title}:</h2>
        <div>
          {events.slice(0, this.state.limit).map(event => (
             <FeaturedEventCard
               key={event._id}
               event={event}
               onClick={onClickEvent}
             />
           ))}
        </div>
        <div>
          {this.state.limit < events.length ?
           <Button
             style={{ marginTop: '1em' }}
             content={`Show More ${title}`}
             fluid
             positive
             onClick={this.handleClickShowMore}
           /> : null}
        </div>
      </div>
    );
  }
}

HeadlineBlock.propTypes = {
  title: PropTypes.string,
  events: PropTypes.array,
  onClickEvent: PropTypes.func,
};
