import React, { PropTypes } from 'react';
import DiscoverEventList from './DiscoverEventList.jsx';
import FilterMenu from './FilterMenu.jsx';
import { Loader } from 'semantic-ui-react';

export default class FilteredEventList extends React.Component {
  render() {
    // get events from active menu item, otherwise use events prop
    const active = this.props.menuItems.find(item => item.key === this.props.activeItem);
    const events = active && active.events || this.props.events;

    return (
      <div className="ui filter-menu" style={{ paddingTop: '2em' }}>
        <FilterMenu
          items={this.props.menuItems}
          activeItem={this.props.activeItem}
        />
        <div style={{ minHeight: '80vh', background: 'white' }}>
          {this.props.loading ? (
             <Loader active inline="centered" />
           ) : (
             <DiscoverEventList
               events={events}
               onClickEvent={this.props.onClickEvent}
             />
           )}
        </div>
      </div>
    );
  }
}
FilteredEventList.propTypes = {
  menuItems: PropTypes.array.isRequired,
  activeItem: PropTypes.string,
  events: PropTypes.array,
  onClickEvent: PropTypes.func,
  loading: PropTypes.bool,
};
