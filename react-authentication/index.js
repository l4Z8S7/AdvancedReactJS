//main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

 //mongodb setup
 mongoose.connect('mongodb://localhost:auth/auth');

//app setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));
require('./router')(app);

//server setup
const port  = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => console.log('Server is listening on', port));