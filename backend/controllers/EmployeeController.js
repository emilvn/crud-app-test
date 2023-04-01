const Employee = require("../models/Employee");

// Show the list of Employees
async function indexEmployee(req, res, next){
    try{
        const employees = await Employee.find();
        res.json({response: employees});
    }
    catch(err){
        res.json({message: "An error occurred"});
    }
}

//show single employee
async function showEmployee(req, res, next){
    let employeeID = req.body.employeeID;
    try{
        const employees = await Employee.findById(employeeID);
        res.json({response: employees});
    }
    catch(err){
        res.json({message: "An error occurred"});
    }
}

// add employee
async function addEmployee(req, res, next){
    let employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    });
    try{
        employee.save();
        res.json({message: "Employee Added Successfully."});
    }
    catch(err){
        res.json({message: "An error occured."});
    }
}

//update employee by id
async function updateEmployee(req, res, next){
    let employeeID = req.body.employeeID;

    let updatedData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }
    try{
        await Employee.findByIdAndUpdate(employeeID, {$set: updatedData});
        res.json({message: "Employee updated Successfully."});
    }
    catch(err){
        res.json({message: "An error occured."});
    }
}

//delete an employee
async function deleteEmployee(req, res, next){
    let employeeID = req.body.employeeID;
    
    try{
        await Employee.findOneAndRemove(employeeID);
        res.json({message: "Employee deleted Successfully."});
    }
    catch(err){
        res.json({message: "An error occured."});
    }
}

module.exports = {
    indexEmployee,showEmployee,addEmployee,updateEmployee,deleteEmployee
}