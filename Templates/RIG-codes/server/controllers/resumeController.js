const Resume = require('../models/Resume');
const ejs = require("ejs");
const puppeteer = require("puppeteer");
const path = require("path");

exports.generateTemplate1PDF = async (req, res) => {
    let browser = null;
    try {
        const { colorTheme, ...data } = req.body;

        if (!data || !data.personalDetails || !data.personalDetails.name) {
            return res.status(400).json({ message: 'Invalid or incomplete resume data provided' });
        }

        // Destructure with default empty values
        const {
            name = '',
            email = '',
            phone = '',
            location = '',
            linkedin = '',
            portfolio = ''
        } = data.personalDetails;

        // Ensure all optional arrays have a default empty array
        const experience = data.experience || [];
        const projects = data.projects || [];
        const qualifications = data.qualifications || [];
        const skills = data.skills || [];
        const optionalDetails = data.optionalDetails || [];

        // Calculate the total number of items in the experience and projects sections
        const totalItems = (data.experience?.length || 0) + (data.projects?.length || 0);

        // Determine font size based on the total items count
        let fontSize;
        if (totalItems < 6) {
            fontSize = 16 - (totalItems - 1) * 1; // Decrease font size gradually as the number of items increases
        } else {
            fontSize = 11; // Set a minimum font size for more content
        }

        const templatePath = path.resolve(__dirname, "../templates/resumeTemplate.ejs");
        const html = await ejs.renderFile(templatePath, {
            name,
            email,
            phone,
            location,
            linkedin,
            portfolio,
            summary: data.summary || '',
            experience,
            projects,
            qualifications,
            skills,
            optionalDetails,
            fontSize,
            color: colorTheme
        });

        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: ['networkidle0', 'load', 'domcontentloaded'] });
        await page.evaluateHandle('document.fonts.ready');

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '10px', right: '10px', bottom: '10px', left: '10px' },
            scale: 0.95 // Adjust scale to potentially fit more content on one page
        });

        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Length': pdfBuffer.length,
            'Content-Disposition': `attachment; filename="resume_${Date.now()}.pdf"`
        });

        return res.end(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        if (browser) await browser.close();
        return res.status(500).json({ message: 'Failed to generate PDF', error: error.message });
    }
};

exports.generateTemplate2PDF = async (req, res) => {
    let browser = null;
    try {
        const { colorTheme, ...data } = req.body;

        // Ensure personalDetails is a defined object before attempting to access its properties
        if (!data.personalDetails || !data.personalDetails.name) {
            return res.status(400).json({ message: 'Invalid or incomplete resume data provided' });
        }

        // Destructure with default empty values
        const {
            name = '',
            email = '',
            phone = '',
            location = '',
            linkedin = '',
            portfolio = ''
        } = data.personalDetails;

        // Ensure all optional arrays have a default empty array
        const experience = data.experience || [];
        const projects = data.projects || [];
        const qualifications = data.qualifications || [];
        const skills = data.skills || [];
        const optionalDetails = data.optionalDetails || [];

        const templatePath = path.resolve(__dirname, "../templates/resumeTemplate2.ejs");

        const html = await ejs.renderFile(templatePath, {
            name,
            email,
            phone,
            location,
            linkedin,
            portfolio,
            summary: data.summary || '',
            experience,
            projects,
            qualifications,
            skills,
            optionalDetails,
            colorTheme
        });

        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: ['networkidle0', 'load', 'domcontentloaded'] });
        await page.evaluateHandle('document.fonts.ready');

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '10px', right: '10px', bottom: '10px', left: '10px' },
            scale: 0.95
        });

        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Length': pdfBuffer.length,
            'Content-Disposition': `attachment; filename="resume_${Date.now()}.pdf"`
        });

        return res.end(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        if (browser) await browser.close();
        return res.status(500).json({ message: 'Failed to generate PDF', error: error.message });
    }
};

exports.generateTemplate3PDF = async (req, res) => {
    let browser = null;
    try {
        const { colorTheme, ...data } = req.body;

        // Ensure personalDetails is a defined object before attempting to access its properties
        if (!data.personalDetails || !data.personalDetails.name) {
            return res.status(400).json({ message: 'Invalid or incomplete resume data provided' });
        }

        // Destructure with default empty values
        const {
            name = '',
            email = '',
            phone = '',
            location = '',
            linkedin = '',
            portfolio = ''
        } = data.personalDetails;

        // Ensure all optional arrays have a default empty array
        const experience = data.experience || [];
        const projects = data.projects || [];
        const qualifications = data.qualifications || [];
        const skills = data.skills || [];
        const optionalDetails = data.optionalDetails || [];

        const templatePath = path.resolve(__dirname, "../templates/resumeTemplate3.ejs");

        const html = await ejs.renderFile(templatePath, {
            name,
            email,
            phone,
            location,
            linkedin,
            portfolio,
            summary: data.summary || '',
            experience,
            projects,
            qualifications,
            skills,
            optionalDetails,
            colorTheme
        });

        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: ['networkidle0', 'load', 'domcontentloaded'] });
        await page.evaluateHandle('document.fonts.ready');

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '10px', right: '10px', bottom: '10px', left: '10px' },
            scale: 0.95
        });

        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Length': pdfBuffer.length,
            'Content-Disposition': `attachment; filename="resume_${Date.now()}.pdf"`
        });

        return res.end(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        if (browser) await browser.close();
        return res.status(500).json({ message: 'Failed to generate PDF', error: error.message });
    }
};


exports.generateTemplate4PDF = async (req, res) => {
    let browser = null;
    try {
        const { colorTheme, ...data } = req.body;

        // Ensure personalDetails is a defined object before attempting to access its properties
        if (!data.personalDetails || !data.personalDetails.name) {
            return res.status(400).json({ message: 'Invalid or incomplete resume data provided' });
        }

        // Destructure with default empty values
        const {
            name = '',
            email = '',
            phone = '',
            location = '',
            linkedin = '',
            portfolio = ''
        } = data.personalDetails;

        // Ensure all optional arrays have a default empty array
        const experience = data.experience || [];
        const projects = data.projects || [];
        const qualifications = data.qualifications || [];
        const skills = data.skills || [];
        const optionalDetails = data.optionalDetails || [];

        const templatePath = path.resolve(__dirname, "../templates/resumeTemplate4.ejs");

        const html = await ejs.renderFile(templatePath, {
            name,
            email,
            phone,
            location,
            linkedin,
            portfolio,
            summary: data.summary || '',
            experience,
            projects,
            qualifications,
            skills,
            optionalDetails,
            colorTheme
        });

        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: ['networkidle0', 'load', 'domcontentloaded'] });
        await page.evaluateHandle('document.fonts.ready');

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '10px', right: '10px', bottom: '10px', left: '10px' },
            scale: 0.95
        });

        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Length': pdfBuffer.length,
            'Content-Disposition': `attachment; filename="resume_${Date.now()}.pdf"`
        });

        return res.end(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        if (browser) await browser.close();
        return res.status(500).json({ message: 'Failed to generate PDF', error: error.message });
    }
};

exports.generateTemplate5PDF = async (req, res) => {
    let browser = null;
    try {
        const { colorTheme, ...data } = req.body;

        // Validate required data
        if (!data.personalDetails || !data.personalDetails.name) {
            return res.status(400).json({ message: 'Invalid or incomplete resume data provided' });
        }

        // Destructure personal details with defaults
        const {
            name = '',
            email = '',
            phone = '',
            location = '',
            linkedin = '',
            portfolio = ''
        } = data.personalDetails;

        // Set defaults for optional arrays
        const experience = data.experience || [];
        const projects = data.projects || [];
        const qualifications = data.qualifications || [];
        const skills = data.skills || [];
        const optionalDetails = data.optionalDetails || [];

        // Calculate the total number of items in the experience and projects sections
        const totalItems = (data.experience?.length || 0) + (data.projects?.length || 0);

        // Determine font size based on the total items count
        let fontSize;
        if (totalItems < 6) {
            fontSize = 16 - (totalItems - 1) * 1; // Decrease font size gradually as the number of items increases
        } else {
            fontSize = 11; // Set a minimum font size for more content
        }

        const templatePath = path.resolve(__dirname, "../templates/resumeTemplate5.ejs");

        const html = await ejs.renderFile(templatePath, {
            name,
            email,
            phone,
            location,
            linkedin,
            portfolio,
            summary: data.summary || '',
            experience,
            projects,
            qualifications,
            skills,
            optionalDetails,
            fontSize, // Pass fontSize to the template
            colorTheme: colorTheme || '#0066cc' // Default blue color if none provided
        });

        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: ['networkidle0', 'load', 'domcontentloaded'] });
        await page.evaluateHandle('document.fonts.ready');

        // Adjusted scale based on content length
        const scale = totalItems > 8 ? 0.95 : 0.98; // Reduce scale for more content

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
            scale
        });

        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Length': pdfBuffer.length,
            'Content-Disposition': `attachment; filename="resume_${Date.now()}.pdf"`
        });

        return res.end(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        if (browser) await browser.close();
        return res.status(500).json({ message: 'Failed to generate PDF', error: error.message });
    } finally {
        if (browser) await browser.close();
    }
};

exports.generateTemplate6PDF = async (req, res) => {
    let browser = null;
    try {
        const { colorTheme, ...data } = req.body;

        // Ensure personalDetails is defined
        if (!data.personalDetails || !data.personalDetails.name) {
            return res.status(400).json({ message: 'Invalid or incomplete resume data provided' });
        }

        // Destructure with default empty values
        const {
            name = '',
            email = '',
            phone = '',
            location = '',
            linkedin = '',
            portfolio = ''
        } = data.personalDetails;

        // Ensure all optional arrays have default empty arrays
        const experience = data.experience || [];
        const projects = data.projects || [];
        const qualifications = data.qualifications || [];
        const skills = data.skills || [];
        const optionalDetails = data.optionalDetails || [];

        const templatePath = path.resolve(__dirname, "../templates/resumeTemplate6.ejs");

        const html = await ejs.renderFile(templatePath, {
            name,
            email,
            phone,
            location,
            linkedin,
            portfolio,
            summary: data.summary || '',
            experience,
            projects,
            qualifications,
            skills,
            optionalDetails,
            colorTheme
        });

        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: ['networkidle0', 'load', 'domcontentloaded'] });
        await page.evaluateHandle('document.fonts.ready');

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '10px', right: '10px', bottom: '10px', left: '10px' },
            scale: 0.95
        });

        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Length': pdfBuffer.length,
            'Content-Disposition': `attachment; filename="resume_${Date.now()}.pdf"`
        });

        return res.end(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        if (browser) await browser.close();
        return res.status(500).json({ message: 'Failed to generate PDF', error: error.message });
    }
};

exports.generateTemplate7PDF = async (req, res) => {
    let browser = null;
    try {
        const { colorTheme, ...data } = req.body;

        // Ensure personalDetails is a defined object before attempting to access its properties
        if (!data.personalDetails || !data.personalDetails.name) {
            return res.status(400).json({ message: 'Invalid or incomplete resume data provided' });
        }

        // Destructure with default empty values
        const {
            name = '',
            email = '',
            phone = '',
            location = '',
            linkedin = '',
            portfolio = ''
        } = data.personalDetails;

        // Ensure all optional arrays have a default empty array
        const experience = data.experience || [];
        const projects = data.projects || [];
        const qualifications = data.qualifications || [];
        const skills = data.skills || [];
        const optionalDetails = data.optionalDetails || [];

        const templatePath = path.resolve(__dirname, "../templates/resumeTemplate7.ejs");

        const html = await ejs.renderFile(templatePath, {
            name,
            email,
            phone,
            location,
            linkedin,
            portfolio,
            summary: data.summary || '',
            experience,
            projects,
            qualifications,
            skills,
            optionalDetails,
            colorTheme
        });

        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: ['networkidle0', 'load', 'domcontentloaded'] });
        await page.evaluateHandle('document.fonts.ready');

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '10px', right: '10px', bottom: '10px', left: '10px' },
            scale: 0.95
        });

        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Length': pdfBuffer.length,
            'Content-Disposition': `attachment; filename="resume_${Date.now()}.pdf"`
        });

        return res.end(pdfBuffer);
    } catch (error) {
        console.error('Error generating PDF:', error);
        if (browser) await browser.close();
        return res.status(500).json({ message: 'Failed to generate PDF', error: error.message });
    }
};

exports.createResume = async (req, res) => {
    try {
        const newResume = new Resume(req.body);
        await newResume.save();
        res.status(201).json(newResume);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getResume = async (req, res) => {
    try {
        console.log("Fetching resume with ID:", req.params.id); // Log the ID received
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        console.log("Fetched resume:", resume); // Log the resume data
        res.json(resume);
    } catch (err) {
        console.error("Error fetching resume:", err);
        res.status(500).json({ message: "Failed to fetch resume" });
    }
};

exports.deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findByIdAndDelete(req.params.id);
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.json({ message: 'Resume deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getResumeTemplates = async (req, res) => {
    try {
        const templates = await Resume.find(); // Fetch all templates
        res.json(templates);
    } catch (err) {
        console.error("Error fetching templates:", err);
        res.status(500).json({ message: "Failed to load templates" });
    }
};

exports.updateResume = async (req, res) => {
    try {
        const updateData = req.body;

        console.log("Updating resume with data:", updateData);

        const resume = await Resume.findByIdAndUpdate(
            req.params.id,
            { $set: updateData }, // Use $set for partial updates
            { new: true, runValidators: true }
        );

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        console.log("Resume updated successfully:", resume);
        res.json(resume);
    } catch (error) {
        console.error("Error updating resume:", error);
        res.status(500).json({ message: "Failed to update resume" });
    }
};
