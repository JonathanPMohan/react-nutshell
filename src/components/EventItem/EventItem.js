import React from 'react';
import eventShape from '../helpers/propz/eventShape';

import './EventItem.scss';

class EventItem extends React.Component {
  static propTypes = {
    event: eventShape.eventShape,
  }

  render() {
    const { event } = this.props;
    console.log(event);
    return (
      <div className="eventItem text-center mx-auto">
        <h3>{event.event}</h3>
        <h5>{event.startDate}</h5>
        <h5>{event.location}</h5>
      </div>
    );
  }
}

export default EventItem;
