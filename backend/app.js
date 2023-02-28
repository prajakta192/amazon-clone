const express =  require('express');
//const data =  require('./data');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors');
const SeedRouter = require('./routes/SeedRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoute');


//connecting to mongodb. then create schema
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('connected to db');
}).catch(err => console.log(err.message));

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/seeds', SeedRouter);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes)


app.use((err,req,res,next) => { 
  res.status(500).send({message: err.message})
})
console.log(__dirname)
app.use(express.static(path.join(__dirname, '../client/build')));

app.get("*", function(_, res){
  res.sendFile(
    path.join(__dirname, '../client/build/index.html'),
    function(err){
      if(err){
        res.send(500).send(err)
      }
    }
  )
})

const port = process.env.PORT;
if(port){
app.listen(port, () => {
  console.log(`server is on http://localhost:${port}`);
})
}

//module.exports = app;