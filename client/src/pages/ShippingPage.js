import React, { useContext, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';

const ShippingPage = () => {
  const navigate = useNavigate()
  const {state, dispatch} = useContext(Store);
  const {cart : {shippingAddress}} = state

  const [formControls, setFormControls] = useState({
    fullName: '',
    address : '',
    city : '',
    pincode : ''
  });
const {fullName, address, city, pincode} =formControls
  const handleChange = (e) => {
    console.log(e.target.value)
    let value = e.target.value;
    let name = e.target.name;
    setFormControls((prev) => {
      //console.log('prev',prev);
      //console.log('name', name, 'value', value)
      return{
       
        ...prev,
        [name] : value
      }
    })
  }
 

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      {type:'SAVE_SHIPPING_ADDRESS',
      payload : {fullName,
        address,
        city,
        pincode
      }
      }
    );
    localStorage.setItem('shippingAddress',
    JSON.stringify({fullName, address,city,pincode}))
    navigate('/payment')
  }
  return (
    <Container style={{width:'50vw'}}>
      <Helmet>Shipping Address</Helmet>
      <h1>Shipping Address</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label htmlFor='fullname'>Full Name</Form.Label>
          <Form.Control id='fullname' type='text' placeholder='Enter your name' name='fullName' value={formControls.fullName} required onChange={handleChange}></Form.Control>
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label htmlFor='address'>Address</Form.Label>
          <Form.Control id='address' type='text' placeholder='Enter your address' name='address' required value={formControls.address} onChange={handleChange}></Form.Control>
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label htmlFor='city'>City</Form.Label>
          <Form.Control id='city' type='text' placeholder='Enter city' name='city' required value ={formControls.city} onChange={handleChange}></Form.Control>
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label htmlFor='pincode'>Pin Code</Form.Label>
          <Form.Control id='pincode' type='text' placeholder='Enter your pincode' name='pincode' required value={formControls.pincode} onChange={handleChange}></Form.Control>
        </Form.Group>
        {/* <Form.Group>
          <Form.Label htmlFor='country'>Country</Form.Label>
          <Form.Control id='country' type='text' placeholder='Enter your country'></Form.Control>
        </Form.Group> */}
        <div className='mt-3'>
          <Button variant='primary' type='submit'>
            Continue
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default ShippingPage
