const express = require('express');
const data = require('../data');
const Products = require('../models/ProductsSchema');
const User = require('../models/UserModel');

const SeedRouter = express.Router();

SeedRouter.get('/', async (req,res) => {
    Products.remove({});
    const CreatedProducts = await Products.insertMany(data.products);
    //res.send(CreatedProducts)

    await User.remove({});
    const CreatedUsers = await User.insertMany(data.users);
    res.send({CreatedProducts,CreatedUsers});
})
module.exports = SeedRouter