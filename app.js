const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const index = require('./routes/index');
require('dotenv').config();
mongoose.connect('mongodb://localhost/memo');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connection success');
});

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', index);

app.listen(app.get('port'), () => {
  console.log('App listening on port ' + app.get('port'));
});

module.exports = app;
