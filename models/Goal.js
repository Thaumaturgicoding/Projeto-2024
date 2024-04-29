// models/Goal.js - Modelo para armazenar metas de redução de tabaco do usuário
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    targetSmokesPerDay: { type: Number, required: true },
    targetDate: { type: Date, required: true }
});

module.exports = mongoose.model('Goal', goalSchema);
