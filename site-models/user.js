const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    hobbies: {
        type: Array
    }
}, {
    timestamps: true
});

const USER = mongoose.model('userData', userSchema);

module.exports = USER;