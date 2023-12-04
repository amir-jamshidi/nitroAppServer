const mongoose = require('mongoose');

const schama = new mongoose.Schema({

    body: {
        type: String,
        required: true
    },
    questionID: {
        type: mongoose.Types.ObjectId,
        ref: 'quesion'
    },
    like: {
        type: Number,
        default: 0
    },
    creatorID: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    isTrueAnswer: {
        type: Number,
        default: 0
    }

}, { timestamps: true });
const model = mongoose.model('answer', schama);
module.exports = model
