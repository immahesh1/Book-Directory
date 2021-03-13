const express = require('express')
const router = express.Router()
const book_schema = require('../model/Book')

router.get('/',(req,res)=>{
    book_schema.find((err,data)=>{
        if(err){
            res.send(`Error occured while fetching book records.`);
            console.log('Error: ',err);
        }else{
            res.send(data);
        }
    })
});

router.get('/title/:title',(req,res)=>{
    const errors = {}
    book_schema.findOne({title:req.params.title})
        .populate('book',['title','subtitle','price','author','format'])
        .then(book => {
            if(!book){
                errors.nobook = `Book record with title ${req.params.title} not found.`
                res.send(errors);
            }
            res.send(book);
        })
        .catch(err => res.send(err));
});


module.exports = router;