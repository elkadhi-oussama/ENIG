// index.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.mongodb_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Schema and Model
const formDataSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  nickname: { type: String, required: true },
  birthdate: { type: String, required: true },
  parent: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthdate: { type: String, required: true },
  },
  partner: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthdate: { type: String, required: true },
  },
  petName: { type: String, required: true },
  companyName: { type: String, required: true },
  keywords: { type: [String], required: true },
  randomNumbers: { type: [Number], required: true },
});

const FormData = mongoose.model("students", formDataSchema);

app.get("/", (req, res) => {
  res.send("hello server side");
});
// Route to handle form submission
app.post("/submit", async (req, res) => {
  try {
    const newData = new FormData(req.body);
    await newData.save();
    res.status(201).json({ message: "Data saved successfully", data: newData });
  } catch (error) {
    res.status(500).json({ error: "Error saving data" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
