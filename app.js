const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const employeeRoutes = require('./routes/employee');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONG=process.env.MONGO_URL;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', employeeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('error', { error: 'Page not found!' });
});

// Database connection
mongoose.connect(process.env.MONGO_URL , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
})
.catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
});