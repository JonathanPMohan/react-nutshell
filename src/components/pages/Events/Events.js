import React from 'react';
import './Events.scss';
import EventItem from '../../EventItem/EventItem';
import smashRequests from '../../helpers/data/smashRequests';
import authRequests from '../../helpers/data/authRequests';

class Events extends React.Component {
  state = {
    events: [],
  }

  componentDidMount() {
    const currentUid = authRequests.getCurrentUid();
    smashRequests.getEventsFromMeAndFriends(currentUid)
      .then((events) => {
        this.setState({ events });
      })
      .catch((error) => {
        console.error('error on getEventsFromMeAndFriends', error);
      });
  }

  render() {
    const { events } = this.state;
    const eventItemComponents = events.map(event => (
      <EventItem
        event={event}
        key={event.id}
      />
    ));
    return (
      <div className='events col'>
        <h2>Events</h2>
        <div>{eventItemComponents}</div>
      </div>
    );
  }
}

export default Events;
