// models/Feedback.js - Modelo para armazenar feedback dos usuários
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    submittedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
