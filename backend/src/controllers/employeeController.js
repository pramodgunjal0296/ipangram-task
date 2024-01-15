const User = require("../models/User");

exports.getEmployees = async (req, res) => {
  try {
    let employees;
    if (req.query.sortBy === "location") {
      employees = await User.find().sort({ location: 1 });
    } else if (req.query.sortBy === "employee_id") {
      const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

      employees = await User.find().sort({ employee_id: sortOrder });
    } else {
      employees = await User.find();
    }

    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find();
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id);
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
    } else {
      res.json(employee);
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Employee ID" });
  }
};

exports.updateEmployeeById = async (req, res) => {
  try {
    const employee = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
    } else {
      res.json(employee);
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Employee data" });
  }
};

exports.deleteEmployeeById = async (req, res) => {
  try {
    const employee = await User.findByIdAndRemove(req.params.id);
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
    } else {
      res.json({ message: "Employee deleted successfully" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Employee ID" });
  }
};
