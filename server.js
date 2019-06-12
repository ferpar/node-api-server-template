require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


//connect to DB
mongoose
  .connect(process.env.DBURL, {useNewUrlParser: true})
  .then( db => console.log(`Connected to Mongo! Database name: "${db.connections[0].name}"`))
  .catch( err => console.error('Error connecting to mongo', err))

//instantiate server
const server = express();
console.log("Server running and listening on port: " + process.env.PORT);

//cors set-up
server.use(cors({
  credentials: true,
  origin:['http://192.168.1.51:9000']  
}))

//middleware set-up
  //body-parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

//express-session + passport set-up
server.use(session({
  cookie: { maxAge: 24*60*60*1000},
  secret: 'signorama',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
require('./passport')(server);

//routes
const routeIndex = require('./routes/index.js');
server.use('/api', routeIndex);

//autoDisconnect from mongo on SIGINT
process.on('SIGINT', () => {
  mongoose.connection.close( () => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  })
})

server.listen(process.env.PORT,'0.0.0.0');
