// models/Progress.js - Modelo para armazenar progresso do usuário no MongoDB
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const progressSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    startDate: { type: Date, required: true },
    targetDate: Date,
    initialSmokesPerDay: { type: Number, required: true },
    currentSmokesPerDay: { type: Number, required: true },
    milestones: [{ date: Date, smokesPerDay: Number }]
});

module.exports = mongoose.model('Progress', progressSchema);
