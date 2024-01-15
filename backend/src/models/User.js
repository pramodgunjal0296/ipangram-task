const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  employee_id: String,
  password: String,
  department: String,
  role: String,
  location: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
