// models/Report.js - Modelo para armazenar relatórios gerados
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    data: { type: Schema.Types.Mixed, required: true }
});

module.exports = mongoose.model('Report', reportSchema);
