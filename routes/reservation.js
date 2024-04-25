
const express = require('express');
const { getReservations, addReservation } = require('../controllers/reservation');

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require('../middleware/auth');

// Setting up routes for reservation handling
router.route('/')
    .get(protect, getReservations) // GET endpoint to retrieve reservations
    .post(protect, authorize('admin', 'user'), addReservation); // POST endpoint to add a reservation

// If you need other routes for individual reservation operations like GET, PUT, DELETE:
// router.route('/:id')
//     .get(protect, getReservation) // Assuming you have a function getReservation in your controller
//     .put(protect, authorize('admin', 'user'), updateReservation) // Assuming updateReservation is defined
//     .delete(protect, authorize('admin', 'user'), deleteReservation); // Assuming deleteReservation is defined

module.exports = router;
