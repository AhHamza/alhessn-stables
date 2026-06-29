const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    visitorName: {
        type: String,
        required: true,
        trim: true
    },
    visitorEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    visitorPhone: {
        type: String,
        trim: true
    },
    horse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Horse',
        default: null // optional — they may book a general training day
    },
    date: {
        type: Date,
        required: true
    },
    timeSlot: {
        type: String, // e.g. "10:00 AM", "2:00 PM"
        required: true
    },
    purpose: {
        type: String,
        enum: ['training', 'viewing', 'trial_ride', 'other'],
        default: 'training'
    },
    notes: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking