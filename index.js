const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/user/registration/user');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

//database config
const db = require('./config/keys');

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//connect to mongodb
mongoose.connect(db.mongoURI, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useCreateIndex: true 
})
.then(()=>console.log('connected to mongodb..'))
.catch(err=>console.error('unable to connect',err)); 

// passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

//use routes
app.use('/user', users);

const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log('listening at port 8000')
})