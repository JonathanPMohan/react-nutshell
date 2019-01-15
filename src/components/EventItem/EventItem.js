import React from 'react';
import PropTypes from 'prop-types';
import eventShape from '../helpers/propz/eventShape';
import authRequests from '../helpers/data/authRequests';

import './EventItem.scss';

class EventItem extends React.Component {
  static propTypes = {
    event: eventShape.eventShape,
    deleteSingleEvent: PropTypes.func,
    passEventToEdit: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleEvent, event } = this.props;
    deleteSingleEvent(event.id);
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passEventToEdit, event } = this.props;
    passEventToEdit(event.id);
  }

  listingClick = (e) => {
    e.stopPropagation();
    const { event, onSelect } = this.props;
    onSelect(event.id);
  }

  render() {
    const { event } = this.props;
    const uid = authRequests.getCurrentUid();

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

    return (
      <div className="eventItem text-center mx-auto" onClick={this.eventClick}>
        <h3>{event.event}</h3>
        <h5>{event.startDate}</h5>
        <h5>{event.location}</h5>
        {makeButtons()}
      </div>
    );
  }
}

export default EventItem;
