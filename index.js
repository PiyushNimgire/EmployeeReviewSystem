const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

//setup for views and ejs
app.set('view engine', 'ejs');
app.set('views', './views');

//setup for express-ejs-layouts
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use('/', require('./routes/index'));

const port = 3000;
app.listen(port, console.log(`Server is running on port: ${port}`));