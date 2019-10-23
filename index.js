const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/user');
const bodyParser = require('body-parser');
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

//use routes
app.use('/api/users', users)

const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log('listening at port 8000')
})