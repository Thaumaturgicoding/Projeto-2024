// models/Reminder.js - Modelo para armazenar lembretes de metas e progressos
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reminderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, required: true },
    remindOn: { type: Date, required: true }
});

module.exports = mongoose.model('Reminder', reminderSchema);
