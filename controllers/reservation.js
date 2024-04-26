const Reservation = require('../models/reservation');
const Workspace = require('../models/workSpace');

//@desc     Get all appointments
//@route    GET/api/v1/appointments
//@access   Public

exports.getReservations = async(req, res, next) => {
    let query;

    // General users can see only their appointments!
    if (req.user.role !== 'admin') {
        // console.log("inside if check role")
        query = Reservation.find({ user: req.user.id }).populate({
            path: 'workspace',
            select: 'name address district province postalcode region' // adjust the fields as necessary
        });
    
    } else {
        // If Admin can see all
        if (req.params.workspaceId) {
            // console.log("check if workspaceID")
            console.log(req.params.workspaceId);
            query = Reservation.find({
                workspace: req.params.workspaceId
            }).populate({
                path: 'workspace',
                select: 'name address district province postalcode region' // adjust the fields as necessary
            });
        } else {
            query = Reservation.find().populate({
                path: 'workspace',
                select: 'name address district province postalcode region' // adjust the fields as necessary
            });
        }
    }

    try {
        const reservations = await query;

        res.status(200).json({
            success: true,
            count: reservations.length,
            data: reservations.map(reservation => ({
                _id: reservation._id,
                user: reservation.user,
                workspace: reservation.workspace // this will include selected workspace details
            }))
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Cannot find your Reservation" });
    }
};

// In controllers/reservation.js

exports.getReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate({
            path: 'workspace',
            select: 'name address district province postalcode region' // Customize as needed
        });

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: 'Reservation not found'
            });
        }

        // Ensure user is either an admin or the owner of the reservation
        if (req.user.role !== 'admin' && reservation.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized to access this reservation'
            });
        }

        res.status(200).json({
            success: true,
            data: reservation
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};


exports.addReservation = async (req, res, next) => {
    try {
        // Get user ID and workspace ID from request body or params
        const { userId, workspaceId } = req.body;  // Assuming these are passed in the request body
        
        // Check the number of existing reservations for this user
        const existingReservationsCount = await Reservation.countDocuments({ user: userId });

        // Allow a maximum of 3 reservations per user
        if (existingReservationsCount >= 3) {
            return res.status(400).json({
                success: false,
                message: "User has already reached the reservation limit of 3."
            });
        }

        // Check if the workspace exists
        const workspaceExists = await Workspace.findById(workspaceId);
        if (!workspaceExists) {
            return res.status(404).json({
                success: false,
                message: `No workspace with the ID of ${workspaceId} found.`
            });
        }

        // Create the reservation
        const newReservation = new Reservation({
            user: userId,
            workspace: workspaceId,
            appDate: req.body.appDate  // Assuming the appointment date is passed in the request body
        });

        // Save the new reservation
        const savedReservation = await newReservation.save();

        // Return the newly created reservation
        res.status(201).json({
            success: true,
            data: savedReservation
        });
    } catch (err) {
        console.log(err.stack);
        return res.status(500).json({
            success: false,
            message: "Failed to create reservation due to an internal error."
        });
    }
};

exports.updateReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: 'Reservation not found'
            });
        }

        // Ensure user is either an admin or the owner of the reservation
        if (req.user.role !== 'admin' && reservation.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized to update this reservation'
            });
        }

        // Update fields that are allowed to be updated
        reservation.appDate = req.body.appDate || reservation.appDate;
        reservation.workspace = req.body.workspaceId || reservation.workspace; // Assuming workspace can be changed

        // Save the updated reservation
        const updatedReservation = await reservation.save();

        res.status(200).json({
            success: true,
            data: updatedReservation
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Failed to update the reservation'
        });
    }
};

exports.deleteReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: 'Reservation not found'
            });
        }

        // Ensure user is either an admin or the owner of the reservation
        if (req.user.role !== 'admin' && reservation.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized to delete this reservation'
            });
        }

        // Optionally, add additional authorization checks here to ensure the user has rights to delete the reservation

        // Delete the reservation
        await reservation.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Reservation successfully deleted'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Failed to delete the reservation'
        });
    }
};