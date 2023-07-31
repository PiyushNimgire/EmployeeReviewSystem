const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const app = express();
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.json());
app.use(express.urlencoded());

//setup for views and ejs
app.set('view engine', 'ejs');
app.set('views', './views');

//setup for express-ejs-layouts
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(session({
    name: 'emp-rev',
    secret: "donotdisturb",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*60)
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes/index'));

const port = 3000;
app.listen(port, console.log(`Server is running on port: ${port}`));