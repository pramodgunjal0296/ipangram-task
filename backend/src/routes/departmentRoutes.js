const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");

router.post("/departments", departmentController.createDepartment);
router.get("/departments", departmentController.getAllDepartments);
router.get("/departments/:id", departmentController.getDepartmentById);
router.put("/departments/:id", departmentController.updateDepartmentById);
router.delete("/departments/:id", departmentController.deleteDepartmentById);

module.exports = router;
