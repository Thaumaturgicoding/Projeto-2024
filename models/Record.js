// models/Record.js - Modelo para registro de consumo de tabaco
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    smokesCount: { type: Number, required: true }
});

module.exports = mongoose.model('Record', recordSchema);
