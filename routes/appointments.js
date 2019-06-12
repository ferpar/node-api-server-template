const express = require('express');
const router = express.Router();

const Appointment = require('../models/Appointment.js')

router.get('/', (req, res) => {
  console.log('home url hit')
  res.status(200)
  res.end("<h1>Welcome Home!</h1>");
})

router.get('/get/:date', (req, res) => {
  const date = req.params.date.split('-');
  const year = date[0], month = date[1], day = date[2];

  const queryDateStr = `${year}-${month}-${day}`

  const queryDate = new Date(queryDateStr);
  const endDate = new Date(queryDateStr);
  endDate.setDate(queryDate.getDate()+1)

  Appointment.find({time: {$gte: queryDate, $lt:endDate}})
    .then( results => res.json(results))
    .catch( err => console.log(err))

})

module.exports = router
