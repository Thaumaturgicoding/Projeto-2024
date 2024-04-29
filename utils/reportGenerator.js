// utils/reportGenerator.js - Utilitário para gerar relatórios com base nos dados do usuário
const Report = require('../models/Report');
const Progress = require('../models/Progress');
const Goal = require('../models/Goal');

function generateReport(userId, startDate, endDate) {
    return Promise.all([
        Progress.find({ userId, date: { $gte: startDate, $lte: endDate } }).exec(),
        Goal.find({ userId, targetDate: { $gte: startDate, $lte: endDate } }).exec()
    ]).then(([progressData, goalData]) => {
        const reportData = {
            progress: progressData,
            goals: goalData
        };
        const newReport = new Report({
            userId: userId,
            startDate: startDate,
            endDate: endDate,
            data: reportData
        });
        return newReport.save().then(report => report.id);
    });
}

module.exports = { generateReport };
