const Department = require("../models/Department");

exports.createDepartment = async (req, res) => {
  try {
    if (!req.body.title || req.body.title.trim() === "") {
      return res.status(400);
    }
    const department = new Department(req.body);
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ error: "Invalid department data" });
  }
};

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getDepartmentById = async (req, res) => {
  app.get("/departments/:id", async (req, res) => {
    try {
      const department = await Department.findById(req.params.id);
      if (!department) {
        res.status(404).json({ error: "Department not found" });
      } else {
        res.json(department);
      }
    } catch (error) {
      res.status(400).json({ error: "Invalid Department ID" });
    }
  });
};

exports.updateDepartmentById = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!department) {
      res.status(404).json({ error: "Department not found" });
    } else {
      res.json(department);
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid department data" });
  }
};

exports.deleteDepartmentById = async (req, res) => {
  try {
    const department = await Department.findByIdAndRemove(req.params.id);
    if (!department) {
      res.status(404).json({ error: "Department not found" });
    } else {
      res.json({ message: "Department deleted successfully" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid department ID" });
  }
};
