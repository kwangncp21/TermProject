const express = require('express');
const router = express.Router();

const app = express();

// Include other resource routers
const reservationRouter = require('./reservation');

const {getWorkspaces,getWorkspace, createWorkspace,updateWorkspace, deleteWorkspace} = require(`../controllers/workSpace`);

const {protect,authorize} = require('../middleware/auth');

//Re-route into other resource routers
router.use('/:workspaceId/reservations/',reservationRouter)

// const Hospital = require('../models/Hospital');
// const Workspace = require('../models/workSpace');

// router.use('/:hospitalId/appointments/',appointmentRouter);

// router.route(`/:id`).get(getHospital).put(protect,authorize('admin'),updateHospital).delete(protect,authorize('admin'),deleteHospital);
router.route(`/`).get(getWorkspaces).post(protect, authorize('admin'),createWorkspace);
router.route(`/:id`).get(getWorkspace).put(protect, authorize('admin'),updateWorkspace).delete(protect, authorize('admin'),deleteWorkspace);

module.exports = router;
// authorize('admin'),