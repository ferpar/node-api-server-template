const mongoose = require('mongoose');

const Appointment = require('../models/Appointment.js');
const Customer = require('../models/Customer.js');

const generator = require('../helpers/generator.js')

mongoose
  .connect('mongodb://localhost:27017/melva', {useNewUrlParser: true})
  .then( db => console.log(`Connected to Mongo! Database name: "${db.connections[0].name}"`))
  .catch( err => console.error('Error connecting to mongo', err))

let TestAppointments = [
  {
    time: new Date(2019, 5, 15, 8, 30, 0).toISOString(),
    duration: 30
  },
  {
    time: new Date(2019, 5, 15, 9, 0, 0).toISOString(),
    duration: 30
  },
  {
    time: new Date(2019, 5, 15, 9, 30, 0).toISOString(),
    duration: 30
  },
  ...generator(2019, 5, 16, 8)
]

Appointment.create(TestAppointments)
  .then( result => { 
    console.log('successfully saved test records');
    console.log( result );
  })
  .catch( err => console.error('There was an error saving the appointments to the database', err))
  .then(() => { 
    console.log('terminating connection to the database'); 
    mongoose.disconnect(); 
  })


