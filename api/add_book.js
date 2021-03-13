const express = require('express')
const book_schema = require('../model/Book');
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


router.put('/update/:title',(req,res)=>{
    book_schema.findOne({title:req.params.title})
        .then(record=>{
            id = record.id;
            const book = new book_schema({
                _id:id,
                page_count:req.body.page_count,
                price:req.body.price
            });
            book_schema.updateOne({_id:id},book)
                .then(()=>{
                    res.send(`Book Record updated`)
                })
                .catch(err => {
                    console.log('Error: ',err);
                    res.send(`Some error occured while updating record.`)
                });
        })
        .catch(err=>console.log('Error: ',err));
});

router.delete('/delete/:title',(req,res)=>{
    book_schema.findOne({title:req.params.title})
        .then(record=>{
            id = record.id;
            book_schema.findByIdAndDelete(id,(err,data)=>{
                if(err){
                    res.send('Some error occured while deleting record');
                    console.log('Error: ',err);
                }else{
                    res.send('Record Deleted!')
                }
            })
        })
        .catch(err=>console.log(err))
});
module.exports = router;