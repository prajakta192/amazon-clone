const express = require('express');
const data = require('../data');
const Products = require('../models/ProductsSchema');

const SeedRouter = express.Router();

SeedRouter.get('/', async (req,res) => {
    Products.remove({});
    const CreatedProducts = await Products.insertMany(data.products);
    res.send(CreatedProducts)
})
module.exports = SeedRouter