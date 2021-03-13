const mongoose = require('mongoose')
const book_schema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    subtitle:{
        type: String,
        required:false
    },
    author:{
        type: String,
        required:true
    },
    format:{
        type:String,
        required:true
    },
    pub_date:{
        type:Date,
        default:Date.now,
        required:true
    },
    page_count:{
        type:Number,
        required:false
    },
    price:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model("book_schema",book_schema);

