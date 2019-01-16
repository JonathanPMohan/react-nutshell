import React from 'react';
import PropTypes from 'prop-types';
import eventShape from '../helpers/propz/eventShape';
import authRequests from '../helpers/data/authRequests';

import './EventItem.scss';

// Event Item Component //

class EventItem extends React.Component {
  // Prop Types For Event Item //
  static propTypes = {
    // Event Shape Props //
    event: eventShape.eventShape,
    // Delete Event Function Props //
    deleteSingleEvent: PropTypes.func,
    // Edit Event Function Props //
    passEventToEdit: PropTypes.func,
  }

  // Delete Event Function //

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleEvent, event } = this.props;
    deleteSingleEvent(event.id);
  }
  // Edit Event Function //

  editEvent = (e) => {
    e.preventDefault();
    const { passEventToEdit, event } = this.props;
    passEventToEdit(event.id);
  }

  render() {
    const { event } = this.props;
    const uid = authRequests.getCurrentUid();

    // Button Creator Function & Edit/Delete On Click //

    const makeButtons = () => {
      if (event.uid === uid) {
        return (
          <div>
            <span className="col">
              <button className="btn btn-default" onClick={this.editEvent}>
                <i className="fas fa-pencil-alt fa-2x"></i>
              </button>
              <button className="btn btn-default" onClick={this.deleteEvent}>
                <i className="fas fa-trash-alt fa-2x"></i>
              </button>
            </span>
          </div>
        );
      }
      return <span className="col-2"></span>;
    };

    // Priting Event To Dom & Calling Create Button Function //

    return (
      <div className="eventItem text-center mx-auto">
        <h3>{event.event}</h3>
        <h5>{event.startDate}</h5>
        <h5>{event.location}</h5>
        {makeButtons()}
      </div>
    );
  }
}

export default EventItem;
