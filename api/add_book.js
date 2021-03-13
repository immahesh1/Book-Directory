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

router.put('/update/:id',(req,res,next)=>{
    const book = new book_schema({
        _id:req.params.id,
        title:req.body.title,
        subtitle:req.body.subtitle,
        author:req.body.author,
        format:req.body.format,
        pub_date:req.body.pub_date,
        page_count:req.body.page_count,
        price:req.body.price
    });
    book_schema.updateOne({_id:req.params.id},book)
        .then(()=>{
            res.send(`Book Record updated`)
        })
        .catch(err => {
            console.log('Error: ',err);
            res.send(`Some error occured while updating record.`)
        });
});
module.exports = router;