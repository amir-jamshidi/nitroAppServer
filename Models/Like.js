const mongoose = require('mongoose');

const shcema = new mongoose.Schema({

    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    answerID: {
        type: mongoose.Types.ObjectId,
        ref: 'answer'
    }

}, { timestamps: true })

const model = mongoose.model('like', shcema);

module.exports = model
