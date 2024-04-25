const Reservation = require('../models/reservation');
const Workspace = require('../models/workSpace');

//@desc     Get all appointments
//@route    GET/api/v1/appointments
//@access   Public

exports.getReservations = async(req,res,next)=>{
    let query;
    //General users can see onlt their appointments!
    if(req.user.role !== 'admin'){
        query = Reservation.find({user:req.user.id}).populate({
            path:'Workspace',
            select:'name province tel'
        });
    }else{//If Admin can see all
        if(req.params.workspaceId){
            console.log(req.params.workspaceId);
            query = Reservation.find({
                workspace:req.params.workspaceId
            });
        }else query = Reservation.find().populate({
            path:'Workspace',
            select:'name province tel'
        });
        // query= Reservation.find();
    }       
    try{
        const reservations = await query;

        res.status(200).json({
            success:true,
            count:reservations.length,
            data: reservations
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Cannot find your Reservation"});
    }
};

// exports.getReservations = async(req,res,next)=>{
//     let query;
//     //General users can see onlt their appointments!
//     if(req.user.role !== 'admin'){
//         query = Reservation.find({user:req.user.id}).populate({
//             path:'workspace',
//             select: 'name province tel'
//         });
//     }else{//If Admin can see all
//         query= Reservation.find().populate({
//             path:'workspace',
//             select: 'name province tel'
//         });;
//     }       
//     try{
//         const reservations = await query;

//         res.status(200).json({
//             success:true,
//             count:reservations.length,
//             data: reservations
//         });
//     }catch(err){
//         console.log(err);
//         return res.status(500).json({success:false,message:"Cannot find your Reservation"});
//     }
// };

// exports.getReservation = async(req,res,next)=>{

//     try{
//         const reservation = await Reservation.findById(req.params.id);

//         res.status(200).json({
//             success:true,
//             count:reservations.length,
//             data: reservations
//         });
//     }catch(err){
//         console.log(err);
//         return res.status(500).json({success:false,message:"Cannot find your Reservation"});
//     }
// };

// exports.addReservation=async(req,res,next)=>{
//     try{
//         req.body.workspace=req.params.workspaceId;

//         const workspace=await Workspace.findById(req.params.workspaceId);

//         if(!workspaceId){
//             return res.status(404).json({success:false,message:`No workspace with the id of ${req.params.workspaceId}`});
//         }
        
//         const reservation = await Reservation.create(req.body);
//             res.status(200).json({
//                 success:true,
//                 data:reservation
//             });

//     }catch(err){
//         console.log(err.stack);
//         return res.status(500).json({success:false,message:`Cannot create Reservation`});
//     }
// };



// exports.getAppointments = async(req,res,next)=>{
//     let query;
//     //General users can see onlt their appointments!
//     if(req.user.role !== 'admin'){
//         query = Appointment.find({user:req.user.id}).populate({
//             path:'hospital',
//             select: 'name province tel'
//         });
//     }else{
//         // If you are an admin, you can see all
//         if(req.params.hospitalId){
//             console.log(req.params.hospitalId);
//             query= Appointment.find({hospital: req.params.hospitalId}).populate({
//                 path: "hospital",
//                 select: "name province tel"
//             });
//         }else
//         query=Appointment.find().populate({
//             path:'hospital',
//             select: 'name province tel'
//         });
//     }       
//     try{
//         const appointments= await query;

//         res.status(200).json({
//             success:true,
//             count:appointments.length,
//             data: appointments
//         });
//     }catch(err){
//         console.log(err);
//         return res.status(500).json({success:false,message:"Cannot find Appointment"});
//     }
// };