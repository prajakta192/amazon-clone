import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { Store } from '../Store'
import { errorMessage } from '../utils'

const SigninPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const curPageUrl = useLocation();
    const {search} = curPageUrl;
   const redirectInUrl = new URLSearchParams(search).get('redirect');
   console.log(curPageUrl);
   const redirect = redirectInUrl?redirectInUrl:'/';

   const {state, dispatch} = useContext(Store);
   const {userInfo} = state; 

   const submitHandler = async (e) => {
    e.preventDefault();
    try{

        const {data} = await axios.post('/api/users/signin',{
            email,
            password
        })
        console.log(data);
        dispatch({type: 'USER_SIGNIN', payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate(redirect || '/');
    }
    catch (err) {
        toast.error(errorMessage(err))
        console.log(err.message)
    }
   }

   useEffect(() => {
    if(userInfo){
        navigate(redirect)
    }
   },[navigate,redirect,userInfo])

  return (
    <Container style={{width:'50vw'}}>
        <Helmet>
            <title>Sign In</title>
        </Helmet>
        <h1 className="my-3">Sign In</h1>
        <ToastContainer position='bottom-center' limit={1}/>
    <Form onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label htmlFor='email'>
            Email
            </Form.Label>
            <Form.Control id='email' type="emial" placeholder='Enter your email' required onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group className='mt-3'>
            <Form.Label htmlFor='password'>
            Password
            </Form.Label>
            <Form.Control id='password' type="password" placeholder='Enter your password' required onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <Button className='d-block mt-3' variant="warning" type="submit">
        Sign In
      </Button>
      <div className='mt-3'>
      <Form.Text className="text-dark">
          New User?
        </Form.Text>
        <Link to={`/signup?redirect=${redirect}`}> Create your account</Link>
        </div>
    </Form>
    </Container>
  )
}

export default SigninPage
