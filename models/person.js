const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    isAvailable: {
        type: Boolean,
        default: false
    },
    days: [{
        _id: false,
        date: String,
        checkIn: String,
        checkOut: String
    }]
})


const Person = new mongoose.model("Person", personSchema);


module.exports = Person;