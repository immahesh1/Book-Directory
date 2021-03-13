const express = require('express')
const mongoose = require('mongoose')
const add_book = require('./api/add_book')
const fetch_book = require('./api/fetch_book')
require('dotenv').config()
const app = express()
app.use(express.json()); //body-parser

const PORT = process.env.PORT || 5000
const uri = process.env.ATLAS_URI

//Mongodb connection
mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() => console.log('*************Connected to the database*************')
).catch(err => console.log('Database connection error: ',err));

//API calls
//_________________________________
//@route: /book/add_book/
//method: POST
app.use('/book/',add_book);

//@route: /book/
//method: GET
app.use('/book/',fetch_book);

app.listen(PORT,()=>console.log(`App started on port: ${PORT}`));