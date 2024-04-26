const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    appDate:{
        type: Date,
        required:true
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:true
    },
    workspace:{
        type: mongoose.Schema.ObjectId,
        ref: 'workSpace',
        required:true
    },
    createAt:{
        type: Date,
        dafault: Date.now
    },
    checkIn:{
        type: Boolean,
        dafault: false
    },
    status: {
        type: String,
        default: 'active', // Possible values: 'active', 'cancelled', 'completed'
        required: true
    }
    
});

module.exports = mongoose.model('Reservation',ReservationSchema);