import React from 'react';
import './Events.scss';
import EventItem from '../../EventItem/EventItem';
import smashRequests from '../../helpers/data/smashRequests';
import authRequests from '../../helpers/data/authRequests';
import EventForm from '../../EventForm/EventForm';
import eventRequests from '../../helpers/data/eventRequests';

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

  formSubmitEvent = (newEvent) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      eventRequests.updateEvent(editId, newEvent)
        .then(() => {
          const currentUid = authRequests.getCurrentUid();
          smashRequests.getEventsFromMeAndFriends(currentUid)
            .then((events) => {
              this.setState({ events, isEditing: false, editId: '-1' });
            })
            .catch((error) => {
              console.error('error on getEventsFromMeAndFriends', error);
            });
        })
        .catch(error => console.error('error on updateEvent', error));
    } else {
      eventRequests.postRequest(newEvent)
        .then(() => {
          const currentUid = authRequests.getCurrentUid();
          smashRequests.getEventsFromMeAndFriends(currentUid)
            .then((events) => {
              this.setState({ events });
            })
            .catch((error) => {
              console.error('error on getEventsFromMeAndFriends', error);
            });
        })
        .catch(error => console.error('error on postRequest', error));
    }
  }

  deleteEvent = (eventId) => {
    eventRequests.deleteEvent(eventId)
      .then(() => {
        const currentUid = authRequests.getCurrentUid();
        smashRequests.getEventsFromMeAndFriends(currentUid)
          .then((events) => {
            this.setState({ events });
          })
          .catch((error) => {
            console.error('error on getEventsFromMeAndFriends', error);
          });
      })
      .catch(error => console.error('error on deleteEvent', error));
  }

  passEventToEdit = eventId => this.setState({ isEditing: true, editId: eventId });

  render() {
    const { events, isEditing, editId } = this.state;
    const eventItemComponents = events.map(event => (
      <EventItem
        event={event}
        key={event.id}
        deleteSingleEvent={this.deleteEvent}
        passEventToEdit={this.passEventToEdit}
      />
    ));
    return (
      <div className='events col'>
        <EventForm onSubmit={this.formSubmitEvent} isEditing={isEditing} editId={editId} />
        <h2>Events</h2>
        <div>{eventItemComponents}</div>
      </div>
    );
  }
}

export default Events;
