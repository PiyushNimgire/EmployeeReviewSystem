const Employee = require('../models/employee');
module.exports.register = (req, res) => {
    res.render('employee_register', {
        title: "Registartion Page"
    })
}

module.exports.create = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    const role = "employee";

    const myObject = {
        name,
        email,
        password,
        confirmPassword,
        role
    };
    const employee = await Employee.create(myObject);
    console.log(employee);
    res.redirect('/employees/register');
}