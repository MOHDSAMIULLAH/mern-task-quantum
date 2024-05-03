// LoginForm.js

import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import { Form, Button, Stack, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://mern-task-quantum.onrender.com/login', { email, password });
      localStorage.setItem('token',JSON.stringify(response.data));
      // Redirect to protected page
      window.location.href = '/protected';
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Row className='d-flex justify-content-center align-items-center'>
        <Col md={4} className=''>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Link to={"/register"}>
      <Button variant="success" type="submit">
        signup
      </Button>
      </Link>
    </Form>
    </Col>
    </Row>
  );
}

export default LoginForm;
