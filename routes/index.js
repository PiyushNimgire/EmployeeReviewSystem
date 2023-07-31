const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/',passport.checkAuthentication ,(req, res) => {
    res.send("<h1>Home</h1>")
});

router.get('/logout', passport.checkAuthentication, (req, res) => {
    req.logout(function(err){
        if(err){
            console.log("Error");
        }
        return res.redirect('/employees/login');
    });
})


router.use('/feedback', require('./feedback'));
router.use('/employees', require('./employees'));

module.exports = router;