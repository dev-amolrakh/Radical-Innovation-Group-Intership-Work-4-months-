// routes/resume.js
const express = require('express');
const resumeController = require('../controllers/resumeController');

const router = express.Router();

// Place this route above the `/resumes/:id` route to avoid conflicts
router.get('/resumes/templates', resumeController.getResumeTemplates);

router.post('/resumes', resumeController.createResume);
router.get('/resumes/:id', resumeController.getResume);
router.put('/resumes/:id', resumeController.updateResume);
router.delete('/resumes/:id', resumeController.deleteResume);
router.post("/generate-template1-pdf", resumeController.generateTemplate1PDF);
router.post("/generate-template2-pdf", resumeController.generateTemplate2PDF);
router.post("/generate-template3-pdf", resumeController.generateTemplate3PDF);
router.post("/generate-template4-pdf", resumeController.generateTemplate4PDF);
router.post("/generate-template5-pdf", resumeController.generateTemplate5PDF);
router.post("/generate-template6-pdf", resumeController.generateTemplate6PDF);
router.post("/generate-template7-pdf", resumeController.generateTemplate7PDF);

module.exports = router;