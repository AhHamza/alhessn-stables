const mongoose = require('mongoose')
const horseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
    }
})

const horse = mongoose.model('Horse', horseSchema)

module.exports = horse