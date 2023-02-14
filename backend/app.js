const express =  require('express');
const data =  require('./data')

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

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((productItem) => productItem._id === req.params.id);
  console.log(req.params)
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
