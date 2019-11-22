'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
var vrtController = require('./app/controllers/vrt.ctrl.js');
const mysql = require('mysql');

const db = mysql.createConnection ({
  host: 'hangover.cxelmrn7jq89.eu-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'admin2019',
  database: 'hangover',
  port:3306
});

db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');
});
global.db = db;

var app = express();

const port = 8008;

app.options('*', cors());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/test', [vrtController]);

app.use( function (req, res, next) {
    next();
});

app.listen(port, () => {
  console.log('Worker vrt listening on ' + port);
});
