const mongoose = require('mongoose');
const scheam = new mongoose.Schema({

    questionID: {
        type: mongoose.Types.ObjectId,
        ref: 'question'
    },
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }

}, { timestamps: true })

const model = mongoose.model('saveQuestion', scheam);

module.exports = model