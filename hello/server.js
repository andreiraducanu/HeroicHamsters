const express = require('express');
const app = express();

const PORT = 4000;


app.get('/hello', function(req, res) {
    res.send('Hello World');
});

app.listen(4000, function() {
    console.log('Server is running on port: ' + PORT);
});