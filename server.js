const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = express.Router();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hellodqw World!'))

routes.route('/hello').get(function(req, res) {
    Todo.find(function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
});


app.post('/', function (req, res) {
  res.send('Got a POST request');
  console.log('asd');
})

app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})

app.post('/diana', function (req, res){
	console.log('dianaaaaaaaaaaa');
})

app.listen(port, () => console.log("Example app listening on port ${port}!", port));