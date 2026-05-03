const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Node backend running");
});

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const User = require("./models/User");

// CREATE
app.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("User created");
});

// GET
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// DELETE
app.delete("/users/:email", async (req, res) => {
  await User.deleteOne({ email: req.params.email });
  res.send("User deleted");
});