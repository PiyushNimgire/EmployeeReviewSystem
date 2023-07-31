const express = require('express');
const router = express.Router();
const passport = require('passport');
const employeeController = require('../controllers/employees_controller');

router.get('/register', employeeController.register);
router.get('/login', employeeController.login);
router.get('/',passport.checkAuthentication, employeeController.employees);
router.get('/remove/:id',passport.checkAuthentication , employeeController.remove);
router.get('/update/:id',passport.checkAuthentication , employeeController.updatePage);
router.get('/review/:id',passport.checkAuthentication , employeeController.reviewPage);
router.post('/review/:id',passport.checkAuthentication , employeeController.review);
router.post('/review/:id/update',passport.checkAuthentication , employeeController.reviewUpdate);
router.post('/update/:id',passport.checkAuthentication , employeeController.update);
router.post('/create', employeeController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/employees/login'}
),employeeController.createSession);

module.exports = router;