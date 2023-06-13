const express = require('express');
const app = express();


app.use('/', require('./routes/index'));

const port = 3000;
app.listen(port, console.log(`Server is running on port: ${port}`));