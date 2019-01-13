import PropTypes from 'prop-types';

const eventShape = {
  event: PropTypes.string.isRequired,
  startDate: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
};

const eventOptionalShape = PropTypes.oneOfType([
  PropTypes.shape({
    nope: PropTypes.string.isRequired,
  }),
  eventShape,
]);

export default { eventShape, eventOptionalShape };
