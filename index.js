const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("<h1>Home</h1>")
})

const port = 8000;
app.listen(port, console.log(`Server is running on port: ${port}`));