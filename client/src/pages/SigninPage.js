import React from 'react'
import { Button, Container, Form, Nav } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation } from 'react-router-dom'

const SigninPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {search} = useLocation();
   const redirectInUrl = new URLSearchParams(search).get('redirect');
   const redirect = redirectInUrl?redirectInUrl:'/'
   //console.log(redirect)
   const {state, dispatch} = useContext(Store);

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
        alert('invalid email or password')
        console.log(err)
    }
   }

  return (
    <Container style={{width:'50vw'}}>
        <Helmet>
            <title>Sign In</title>
        </Helmet>
        <h1 className="my-3">Sign In</h1>
    <Form onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label>
            Email
            </Form.Label>
            <Form.Control type="emial" placeholder='Enter your email' required onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group className='mt-3'>
            <Form.Label>
            Password
            </Form.Label>
            <Form.Control type="password" placeholder='Enter your password' required onChange={(e) => setPassword(e.target.value)}/>
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
