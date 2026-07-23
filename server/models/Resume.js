const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, default: "Untitled Resume", required: true },
    templateId: { type: String, required: true},
    // This stores the history of changes or copies (or versions) (Evolution Tracker)
    versions: [{
        label: String, // e.g., "Initial Draft", "After Java Certification"
        content: Object, // Stores the full resume data object
        updatedAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', ResumeSchema);