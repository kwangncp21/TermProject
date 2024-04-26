const express = require('express');
const { getReservations,getReservation, addReservation,updateReservation,deleteReservation,checkInReservation} = require('../controllers/reservation');

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require('../middleware/auth');

// Setting up routes for reservation handling
router.route('/')
    .get(protect, getReservations) // GET endpoint to retrieve reservations
    .post(protect, authorize('admin', 'user'), addReservation); // POST endpoint to add a reservation

router.route('/:id')
.get(protect, getReservation)
.put(protect, authorize('admin','user'), updateReservation)
.delete(protect, authorize('admin','user'), deleteReservation)
.post(protect, checkInReservation);


module.exports = router;