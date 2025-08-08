//require('dotenv').config(); // Load env variables ASAP
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const UserModel = require('./src/model/User');
const connectDB = require('./src/DB/db.js');
const { EsewaInitiatePayment, paymentStatus } = require('./src/controller/esewa.controller');
const Transaction = require('./src/model/Transaction.model.js');
const bodyParser = require('body-parser');
const app = express();
const contactRoutes = require('./src/routes/contact.routes');  

dotenv.config(); // Load environment variables from .env file
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const donationRoutes = require("./src/routes/donation.routes");
app.use(donationRoutes);
app.use('/api', contactRoutes); // Use contact routes

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3001;



//routes
app.post("/initiate-payment", EsewaInitiatePayment);
app.post("/payment-status", paymentStatus);



// REGISTER route
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

    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("User saved:", newUser);

    res.json({ success: true, message: "User registered successfully" });

  } catch (err) {
    console.error("❌ Error in /register:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// LOGIN route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

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
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
