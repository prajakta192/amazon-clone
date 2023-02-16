const mongoose = require('mongoose');

//Creating Schema for document
const ProductsSchema = new mongoose.Schema({
    name : {type : String, required:true,unique:true},
    slug : {type:String,required:true,unique:true},
    image: {type:String,required:true},
    brand:{type:String,required:true},
    category : {type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    countInStock:{type:Number,required:true},
    rating:{type:Number,required:true},
    numReviews:{type:Number,required:true}
},
{
    timestamps:true
}
)

//creating model to use schema

const Products = mongoose.model('Products', ProductsSchema)
module.exports = Products