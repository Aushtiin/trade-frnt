import React, { useState } from 'react'
import { Form, Row, Col, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.post(`https://testdepot-app.herokuapp.com/api/users/login`, { email, password }, config)
    localStorage.setItem('logindetails', JSON.stringify(data))
    history.push('/products')
  }
  return (
    <Container className=''>
      <h1>Sign In</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button className='my-3' type='submit'>Log In</Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Don't Have An Account? {' '}
          <Link to='/register'>
            Register
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginScreen
