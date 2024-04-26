const express = require('express');
const router = express.Router();

const app = express();

// Include other resource routers
const reservationRouter = require('./reservation');

const {getWorkspaces,getWorkspace, createWorkspace,updateWorkspace, deleteWorkspace} = require(`../controllers/workSpace`);

const {protect,authorize} = require('../middleware/auth');

//Re-route into other resource routers
router.use('/:workspaceId/reservations/',reservationRouter)

router.route(`/`).get(getWorkspaces).post(protect, authorize('admin'),createWorkspace);
router.route(`/:id`).get(getWorkspace).put(protect, authorize('admin'),updateWorkspace).delete(protect, authorize('admin'),deleteWorkspace);

module.exports = router;
// authorize('admin'),