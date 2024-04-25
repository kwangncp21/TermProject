const express = require('express');

const {getReservations,addReservation} = require('../controllers/reservation');

const router = express.Router({mergeParams:true});

const {protect,authorize} = require('../middleware/auth');

// const {protect} = require('../middleware/auth');

router.route('/').get(protect,getReservations);
// router.route('/').get(protect,getReservation).post(protect, authorize('admin','user'),addAppointment);
// router.route('/:id').get(protect,getAppointment).put(protect, authorize('admin','user'),updateAppointment).delete(protect, authorize('admin','user'),deleteAppointment);

module.exports=router;