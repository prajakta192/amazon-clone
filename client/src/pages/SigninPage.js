import React from 'react'
import { Button, Container, Form, Nav } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation } from 'react-router-dom'

const SigninPage = () => {
    const {search} = useLocation();
   const redirectInUrl = new URLSearchParams(search).get('redirect');
   const redirect = redirectInUrl?redirectInUrl:'/'
   console.log(redirect)
  return (
    <Container style={{width:'50vw'}}>
        <Helmet>
            <title>Sign In</title>
        </Helmet>
        <h1 className="my-3">Sign In</h1>
    <Form>
        <Form.Group>
            <Form.Label>
            Email
            </Form.Label>
            <Form.Control type="emial" placeholder='Enter your email'/>
        </Form.Group>
        <Form.Group className='mt-3'>
            <Form.Label>
            Password
            </Form.Label>
            <Form.Control type="password" placeholder='Enter your password'/>
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
