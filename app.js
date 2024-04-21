const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Define a Mongoose schema for the user
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Create a Mongoose model based on the schema
const User = mongoose.model("User", userSchema);

// Connect to MongoDB database
mongoose
  .connect("mongodb://localhost:27017/bcrypt")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Endpoint for user registration
app.post("/api/users", async (req, res) => {
  const { username, password } = req.body;

  // Create a new user document and save it to the database
  const newUser = new User({ username, password });
  await newUser.save();

  res.status(201).json({ message: "User registered successfully" });
});

// Endpoint to fetch all users
app.get("/api/users", async (req, res) => {
  const allUsers = await User.find({});
  res.status(200).json(allUsers);
});

// Endpoint to delete a user by ID
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  const deletedUser = await User.findByIdAndDelete(id);
  res.status(200).json({ message: "User deleted successfully" });
});

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});