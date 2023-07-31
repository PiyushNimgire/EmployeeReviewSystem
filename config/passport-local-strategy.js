const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Employee = require('../models/employee');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    async function(req, email, password, done) {
      const employee = await Employee.findOne({ email: email })
      if(!employee || employee.password != password || req.body.role != employee.role){
        return done(null, false);
      }
      return done(null, employee);
    }
));


//serialize user
passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(async function(id, done){
  const employee = await Employee.findById(id);
  if(!employee){
    return done(err);
  }

  return done(null, employee);
});

// check if user is authenticated
passport.checkAuthentication = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }

  // if user is not signed in
  return res.redirect('/employees/login');
}

passport.setAuthenticatedUser = (req, res, next) => {
  if(req.isAuthenticated()){
    res.locals.user = req.user;
  }

  next();
}

module.exports = passport;