const Employee = require('../models/employee');
const Admin = require('../models/admin');
const Review = require('../models/review');
const Feedback = require('../models/feedback');

module.exports.employees = async (req, res) => {
    if( res.locals.user.role == "admin"){
        const employee_list = await Employee.find({});

        return res.render('employee_list', {
            title: 'Employee List',
            employee_list: employee_list
        });
    }

    return res.redirect('/feedback/feedback-list-page');
    
}

module.exports.remove = async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    return res.redirect('/employees');
}

module.exports.updatePage = async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    return res.render('update_page',{
        title: "Update Page",
        employee: employee
    })
}

module.exports.reviewPage = async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    const employees = await Employee.find({});
    const review = await Review.findOne({ user: req.params.id });
    let feedback = null;
    if(review != null){
        feedback = await Feedback.findOne({feedbackBy: review.assignedTo, performanceReviewId: review.id});
    }
    return res.render('review_page', {
        title: "Review Page",
        employee: employee,
        employees: employees,
        review: review,
        feedback: feedback
    })
}

module.exports.review = async (req, res) => {
    await Review.create(req.body);
    return res.redirect(`/employees/review/${req.params.id}`);
}

module.exports.reviewUpdate = async (req, res) => {
    // console.log(req.params.id);
    // console.log(req.body);
    await Review.findByIdAndUpdate(req.params.id, req.body);
    return res.redirect(`/employees/review/${req.body.user}`);
}

module.exports.update = async (req, res) => {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body);
    console.log(employee);
    return res.redirect('/employees');
}

module.exports.register = (req, res) => {
    if(req.isAuthenticated() && res.locals.user.role != 'admin'){
        return res.redirect('/');
    }

    return res.render('employee_register', {
        title: "Registartion Page"
    })
}

module.exports.login = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/employees');
    }

    return res.render('login_page', {
        title: "Log In"
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
    // console.log(employee);
    return res.redirect('/employees');
}

module.exports.createSession = async (req, res) => {
    // if(req.body.role == "admin"){
    //     //Todo later: query in admin and login
    //     const admin = await Admin.findOne({email: req.body.email});
    //     if(!admin){
    //         return res.redirect('/employees/login');
    //     }
    //     console.log(admin);
    // }else {
        // const employee = await Employee.findOne({email: req.body.email});
        // if(!employee){
        //     return res.redirect(401, '/employees/login');
        // }else if(req.body.role != employee.role){
        //     return res.redirect(401, '/employees/login');
        // }
        // console.log(employee);
    // }

    return res.redirect('/employees');
}