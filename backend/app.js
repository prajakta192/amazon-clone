import express from 'express';
import data from './data.js';

const app = express();

app.get('/api/products', (req, res) => {
  //create end point & send data as response
  res.send(data.products);
});

app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find((productItem) => productItem.slug === req.params.slug);
  console.log(product)
if(product){
  res.send(product);
}else{
  res.status(404).send({message: 'Product Not Found'})
}
})

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server is on http://localhost:${port}`);
});
