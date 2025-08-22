const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const resumeRoutes = require('./routes/resume');

const app = express();

app.use(cors());

// Connect to the database
const MONGODB_URI = 'mongodb+srv://pradeeprkummitha:templates@cluster0.wv8f7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to the database
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

app.use(express.json());
app.use('/api', resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});