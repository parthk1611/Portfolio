import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080; // Use environment variable for port if available

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors()); // Enable CORS

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/Skeleton";

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));

// Routes
app.get('/', (req, res) => {
    res.json({ message: "Welcome to DressStore application." });
});

app.use('/api', routes); // Use modularized routes

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
