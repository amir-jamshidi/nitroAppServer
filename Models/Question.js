const mongoose = require('mongoose');

const schema = new mongoose.Schema({

}, { timestamps: true })

const model = mongoose.model('question', schema);
module.exports = model