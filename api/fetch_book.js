const express = require('express')
const router = express.Router()
const book_schema = require('../model/Book')

router.get('/',(req,res)=>{
    book_schema.find((err,data)=>{
        if(err){
            res.send(`Error occured while fetching book records!`);
            console.log('Error: ',err);
        }else{
            res.send(data);
        }
    })
});

module.exports = router;