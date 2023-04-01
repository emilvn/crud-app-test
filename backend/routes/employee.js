const express = require("express");
const router = express.Router();

const EmployeeController = require("../controllers/EmployeeController");

router.get("/", EmployeeController.indexEmployee);
router.post("/show", EmployeeController.showEmployee);
router.post("/add", EmployeeController.addEmployee);
router.post("/update", EmployeeController.updateEmployee);
router.post("/delete", EmployeeController.deleteEmployee);

module.exports = router;