const express = require('express');
const router = express.Router();

const app = express();

// router.get('/',(req,res) => {
//     res.status(200).json({
//         success:true,
//         msg:'show all workspaces'
//     });
// });

// router.get('/:id',(req,res) => {
//     res.status(200).json({
//         success:true,
//         msg:`show workspaces' ${req.params.id}`
//     });
// });

// router.post('/',(req,res) => {
//     res.status(200).json({
//         success:true,
//         msg:'Create new workspaces'
//     });
// });

// router.put('/:id',(req,res) => {
//     res.status(200).json({
//         success:true,
//         msg:`Update workspaces' ${req.params.id}`
//     });
// });

// router.delete('/:id',(req,res) => {
//     res.status(200).json({
//         success:true,
//         msg:`Delete workspaces' ${req.params.id}`
//     });
// });

// const {getHospitals,getHospital,createHospital,updateHospital,deleteHospital,getVacCenters} = require(`../controllers/hospitals`);

const {getWorkspaces,getWorkspace, createWorkspace,updateWorkspace, deleteWorkspace} = require(`../controllers/workSpace`);

const {protect,authorize} = require('../middleware/auth');

// const Hospital = require('../models/Hospital');
// const Workspace = require('../models/workSpace');

// router.use('/:hospitalId/appointments/',appointmentRouter);

// router.route(`/:id`).get(getHospital).put(protect,authorize('admin'),updateHospital).delete(protect,authorize('admin'),deleteHospital);
router.route(`/`).get(getWorkspaces).post(createWorkspace);
router.route(`/:id`).get(getWorkspace).put(updateWorkspace).delete(deleteWorkspace);

module.exports = router;