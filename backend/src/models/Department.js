const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Department = mongoose.model("Department", DepartmentSchema);

module.exports = Department;
