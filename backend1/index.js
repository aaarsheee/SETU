// index.js
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const detectRoute = require('./src/routes/detectRoute.js');
const contactRoutes = require('./src/routes/contact.routes.js');
const donationRoutes = require('./src/routes/donation.routes.js');

// MongoDB connection
const connectDB = require('./src/DB/db.js');

// Other imports
const bcrypt = require('bcryptjs');
const UserModel = require('./src/model/User.js');
const { EsewaInitiatePayment, paymentStatus } = require('./src/controller/esewa.controller.js');
const Transaction = require('./src/model/Transaction.model.js');

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ CORS for frontend (Vite)
app.use(cors({
  origin: ["http://localhost:5173", "https://setu-frontend.onrender.com"], // your frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// Body parsers
app.use(bodyParser.json({ limit: "10mb" })); // for large base64 images
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', detectRoute); // ASL detection
app.use("/api", contactRoutes);  // Contact routes
app.use(donationRoutes);         // Donation routes

// MongoDB connection
connectDB();

// Payment routes
app.post("/initiate-payment", EsewaInitiatePayment);
app.post("/payment-status", paymentStatus);

// Auth routes
app.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();

    res.json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Error in /register:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    res.json({
      success: true,
      message: "Login successful",
      user: { firstName: user.firstName, lastName: user.lastName, email: user.email }
    });
  } catch (err) {
    console.error("❌ Error in /login:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
