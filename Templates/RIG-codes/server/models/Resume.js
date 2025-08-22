const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    personalDetails: {
        name: String,
        email: String,
        phone: String,
        linkedin: String,
        portfolio: String,
        location: String,
    },
    summary: String,
    experience: [
        {
            position: String,
            company: String,
            duration: String,
            details: [String],
        },
    ],
    projects: [
        {
            title: String,
            description: [String],
        },
    ],
    qualifications: [
        {
            degree: String,
            institute: String,
            percentage: String,
        },
    ],
    skills: [String],
    optionalDetails: [String],
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;