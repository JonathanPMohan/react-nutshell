import axios from 'axios';
import apiKeys from '../apiKeys';

// Firebase API URL //

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

// Axios Call To Grab All Events //

const getAllEvents = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events.json`)
    .then((result) => {
      const eventObject = result.data;
      const eventArray = [];
      if (eventObject != null) {
        Object.keys(eventObject).forEach((eventId) => {
          eventObject[eventId].id = eventId;
          eventArray.push(eventObject[eventId]);
        });
      }
      resolve(eventArray);
    })
    .catch((error) => {
      reject(error);
    });
});

// Delete Event Axios Call //

const deleteEvent = eventId => axios.delete(`${firebaseUrl}/events/${eventId}.json`);

// Post New Event Axios Call //

const postRequest = newEvent => axios.post(`${firebaseUrl}/events.json`, newEvent);

// Grab Single Event For Edit Axios Call //

const getSingleEvent = eventId => axios.get(`${firebaseUrl}/events/${eventId}.json`);

// Update Event Axios Call //

const updateEvent = (eventId, event) => axios.put(`${firebaseUrl}/events/${eventId}.json`, event);

export default {
  getAllEvents,
  deleteEvent,
  postRequest,
  getSingleEvent,
  updateEvent,
};
