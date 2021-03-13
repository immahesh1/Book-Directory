const express = require('express')
const mongoose = require('mongoose')
const api = require('./api/add_book')
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


app.get('/',(req,res)=>{
    res.send('Hi');
});

app.use('/book/',api);

app.listen(PORT,()=>console.log(`App started on port: ${PORT}`));