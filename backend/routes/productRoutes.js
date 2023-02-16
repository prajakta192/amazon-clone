const express = require('express');
const Products = require('../models/ProductsSchema');

const productRoutes = express.Router();

productRoutes.get('/', async(req,res) => {
    const products = Products.find();
    res.send(products)
});
productRoutes.get('/slug/:slug', async(req, res) => {
    const product = await Products.findOne({slug:req.params.slug});
    console.log(product)
  if(product){
    res.send(product);
  }else{
    res.status(404).send({message: 'Product Not Found'})
  }
  })
  
  productRoutes.get('/:id', async(req, res) => {
    const product = await Products.findById(req.params.id);
    console.log(req.params)
  if(product){
    res.send(product);
  }else{
    res.status(404).send({message: 'Product Not Found'})
  }
  })
module.exports = productRoutes;