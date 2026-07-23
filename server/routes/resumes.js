const router = require('express').Router();
const Resume = require('../models/Resume');
const jwt = require('jsonwebtoken');

// Middleware to verify the token and get User ID
const verify = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access Denied");
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) { res.status(400).send("Invalid Token"); }
};

// CREATE or UPDATE a resume (Evolution Tracker logic)
router.post('/save', verify, async (req, res) => {
    const { resumeId, title, content, templateId, versionIndex, createNewVersion } = req.body;

    try {
        if (resumeId) {
            const resume = await Resume.findById(resumeId);
            
            if (createNewVersion) {
                // USER CHOICE: Manual Checkpoint (Evolution Tracker)
                resume.versions.push({ 
                    content, 
                    label: `Version ${resume.versions.length + 1}` 
                });
            } else {
                // QUICK SAVE: Overwrite the specific version the user is viewing
                resume.versions[versionIndex].content = content;
                resume.versions[versionIndex].updatedAt = Date.now();
            }

            resume.title = title || resume.title;
            await resume.save();
            return res.json(resume);
        } else {
            // BRAND NEW RESUME CONTAINER
            const newResume = new Resume({
                userId: req.user.id,
                title,
                templateId,
                versions: [{ content, label: "Initial Version" }]
            });
            const savedResume = await newResume.save();
            res.json(savedResume);
        }
    } catch (err) { res.status(500).json(err); }
});

// GET all resumes for the logged-in user
router.get('/my-resumes', verify, async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user.id });
        res.json(resumes);
    } catch (err) { res.status(500).json(err); }
});

// GET a specific resume by ID
router.get('/:id', verify, async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) return res.status(404).json({ message: "Resume not found" });
        
        // Safety check: ensure the resume belongs to the logged-in user
        if (resume.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        
        res.json(resume);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;