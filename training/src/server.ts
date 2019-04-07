import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();
const port = 3000; // default port to listen

//  set up our application to report and generate logs files
app.use(morgan('common'));

// support parsing of application/json type post data
app.use(bodyParser.json());

// define a route handler for the default home page
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// start the express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
