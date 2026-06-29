const mongoose = require('mongoose')

const inquirySchema = new mongoose.Schema({
    senderName: {
        type: String,
        required: true,
        trim: true
    },
    senderEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    senderPhone: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        enum: ['purchase', 'contact'],
        required: true
    },
    horse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Horse',
        default: null // only for purchase inquiries
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['new', 'read', 'replied', 'closed'],
        default: 'new'
    }
}, {
    timestamps: true
})

const Inquiry = mongoose.model('Inquiry', inquirySchema)
module.exports = Inquiry