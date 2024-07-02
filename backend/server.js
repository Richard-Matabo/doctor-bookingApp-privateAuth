
require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const appointmentsRouter = require('./routes/appointments');


//express app
const app = express();

//middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Use the routes
app.use('/api/user', userRoutes);
app.use('/api/appointments', appointmentsRouter);


// connect to db
mongoose.connect("mongodb://localhost:27017/doctorApp", {useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`connected to db & Server is running on http://localhost:`, process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
