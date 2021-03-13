const express = require('express')
const book_schema = require('../model/Book');
const { route } = require('./fetch_book');
const router = express.Router()

router.post('/add_book', async(req,res)=>{
    try{
        const book_details = new book_schema(req.body)
        await book_details.save()
        res.send(`Book entry completed with title: ${req.body.title}`);
    }catch(err){
        res.send(`Error occured while book entry.`);
        console.log(err);
    }
});


module.exports = router;