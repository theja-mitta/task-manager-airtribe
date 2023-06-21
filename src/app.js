const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = express.Router();
const taskInfo = require('./routes/taskInfo');

const app = express();

//This enables Cross-Origin Resource Sharing (CORS) for the application
app.use(cors());

//The "routes" middleware is responsible for handling the incoming requests and routing them to the appropriate controller for further processing.
app.use(routes);

//"bodyParser" middleware is responsible for parsing the incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes.get('/', (req, res) => {
    res.status(200).send('Welcome to task manager api dashboard!');
});

routes.use('/tasks', taskInfo);

module.exports = app;