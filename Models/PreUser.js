const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
}, { timestamps: true });
const model = mongoose.model('preUser', schema);
module.exports = model
