const mongoose = require('mongoose');
const schema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    creatorID: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    isAnswer: {
        type: Number,
        default: 0
    },
    categoryID: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
        required: true
    },
    isHasTrueAnswer: {
        type: Number,
        default: 0
    },
    answerCount: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

const model = mongoose.model('question', schema);
module.exports = model
