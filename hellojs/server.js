const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Routes = express.Router();
const PORT = 4003;

app.use(cors());
app.use(bodyParser.json());

Routes.route('/hello').get(function(req, res) {
    Todo.find(function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
});


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});