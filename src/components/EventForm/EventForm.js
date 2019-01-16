import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import './EventForm.scss';
import PropTypes from 'prop-types';
import authRequests from '../helpers/data/authRequests';
import eventRequests from '../helpers/data/eventRequests';

// Setting Event Variable //

const defaultEvent = {
  uid: '',
  event: '',
  startDate: 0,
  location: '',
};

// Event Form Beginning: onSubmit, isEditing & editId Prop Types //

class EventForm extends React.Component {
  static propTypes = {
    // Props For On Submit Function //
    onSubmit: PropTypes.func,
    // Props For Is Editing True/False //
    isEditing: PropTypes.bool,
    // Props For The Edit ID string //
    editId: PropTypes.string,
  }

  // Setting State For New Event From Form //

  state = {
    newEvent: defaultEvent,
  }

  // Form String Function For Create Event //

  formFieldStringState = (name, e) => {
    e.preventDefault();
    // Setting State For Create Event //
    const tempEvent = { ...this.state.newEvent };
    // Grabbing The Value Of Event Form Information //
    tempEvent[name] = e.target.value;
    // Setting State for New Event From Form //
    this.setState({ newEvent: tempEvent });
  }

  // Name Field Change Function //

  nameChange = e => this.formFieldStringState('event', e)

  // Location Field Change Function //

  locationChange = e => this.formFieldStringState('location', e)

  // Date Field Change Function //

  dateChange = e => this.formFieldStringState('startDate', e)

  // Submit Form Function //
  formSubmit = (e) => {
    e.preventDefault();
    // Setting Props For onSubmit //
    const { onSubmit } = this.props;
    // Setting Props For Form Submit as New Event //
    const myEvent = { ...this.state.newEvent };
    // Grabbing Events For Current User ID //
    myEvent.uid = authRequests.getCurrentUid();
    onSubmit(myEvent);
    // Setting The State of Submit Form To New Event //
    this.setState({ newEvent: defaultEvent });
  }

  // Edit/Update Feature //
  componentDidUpdate(prevProps) {
    // Setting Editing Props //
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      // Pulling Single Event To Edit //
      eventRequests.getSingleEvent(editId)
        .then((event) => {
          // Setting State of Edited Event Data //
          this.setState({ newEvent: event.data });
        })
        .catch(err => console.error('error with getSingleListing', err));
    }
  }

  render() {
    // Set State For New Event & Editing Props //
    const { newEvent } = this.state;
    const { isEditing } = this.props;
    // Changing Page Title <h2> On Edit //
    const title = () => {
      if (isEditing) {
        return <h2>Edit Event</h2>;
      }
      return <h2>Add Event</h2>;
    };
    // Event Form Component Calling Form Submit Function //
    return (
      <div className="event-form col">
        {title()}
        <Form onSubmit={this.formSubmit}>
          <FormGroup>
            <Label for="exampleName">Event Name:</Label>
            <Input
              type="name"
              name="name"
              id="exampleName"
              placeholder="Event Name"
              // Grabbing New Event Name Value //
              value={newEvent.event}
              // Grabbing Edit Event Name Value //
              onChange={this.nameChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleDate">Event Date:</Label>
            <Input
              type="date"
              name="date"
              id="exampleDate"
              placeholder="type event date"
              // Grabbing New Event Date Value //
              value={newEvent.startDate}
              // Grabbing Edit Event Date Value //
              onChange={this.dateChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleLocation">Event Location:</Label>
            <Input
              type="location"
              name="location"
              id="exampleLocation"
              placeholder="Event Location"
              // Grabbing New Event Location Value //
              value={newEvent.location}
              // Grabbing Edit Event Location Value //
              onChange={this.locationChange}
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default EventForm;
