const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employees_controller');

router.get('/register', employeeController.register);

module.exports = router;