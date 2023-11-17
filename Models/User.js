const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    avatar: {
        type: String,
        default: 'userAvatar.png'
    }
}, { timestamps: true });

const model = mongoose.model('user', schema);
module.exports = model