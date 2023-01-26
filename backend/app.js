import express from 'express';
import data from './data.js';

const app = express();

app.get('/api/products', (req, res) => {
  //create end point & send data as response
  res.send(data.products);
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server is on http://localhost:${port}`);
});
