const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const book_schema = require('./model/Book')
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

app.post('/add_book', async(req,res)=>{
    try{
        const book_details = new book_schema(req.body)
        await book_details.save()
        res.send(`Book entry completed with title: ${req.body.title}`);
    }catch(err){
        res.send(`Error occured while book entry.`);
        console.log(err);
    }
});

app.listen(PORT,()=>console.log(`App started on port: ${PORT}`));