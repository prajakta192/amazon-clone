import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  //const param = useParams(); //returns obj. with key/value of currrent URL.
  //console.log(param.id);

  const { id } = useParams(); // will use obj destructuring method

  return <div>{id}</div>;
};

export default ProductPage;
