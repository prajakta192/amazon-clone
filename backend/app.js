const express =  require('express');
const data =  require('./data');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const SeedRouter = require('./routes/SeedRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use('/api/seeds', SeedRouter);
app.use('/api/products', productRoutes);

//connecting to mongodb. then create schema
mongoose.connect(process.env).then(() => {
  console.logr('connected to db');
}).catch(err => console.log(err.message));


const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server is on http://localhost:${port}`);
});
