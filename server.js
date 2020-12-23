const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
const dbConfig = require('./db');
const mongoose = require('mongoose');

 // Connecting to the database

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
    console.log('Database sucessfully  connected ')
  },
  error => {
    console.log('Database error: ' + error)
  }
)

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

require('./router/student.js')(app);

// listen for requests
app.listen(9000, () => {
    console.log("Server is listening on port 9000");
});