// RegistrationForm.js

import React, { useState } from 'react';
import { Form, Button,Col,Row, Container } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ name, email, password, dob },"{ name, email, password, dob }")
    try {
        const response = await axios.post('http://localhost:5000/register', { name, email, password, dob });
      localStorage.setItem('token',JSON.stringify(response.data));
      // Redirect to login page
      window.location.href = '/protected';
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#008080" }}> 
      <Container className="py-5 h-100" >
      <Row className="d-flex justify-content-center align-items-center h-100">
      <Col xs={12} md={8} lg={6} xl={5}>
      <div className="card shadow-2-strong" style={{ backgroundColor: "#003366" }}>
              <div className="card-body p-5">
                    <div className="d-flex justify-content-center align-items-center">

                <h3 className="mb-5 fs-1 text-center px-5 py-3 text-light   " style={{ backgroundColor: "#008080" }}>Register</h3>
                    </div>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicName" className='mb-2'>
        <Form.Label className='text-light'>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicDOB" className='mb-2'>
        <Form.Label className='text-light'>Date of Birth</Form.Label>
        <Form.Control type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicEmail" className='mb-2'>
        <Form.Label className='text-light'>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className='mb-2'>
        <Form.Label className='text-light'>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit" className='mt-4 w-100 '>
        Submit
      </Button>
    </Form>
    <hr className="my-4"/>
                <Link to={"/login"} className=''>  
                <div className='text-center fs-5 text-light '>Login                    </div>  
             
      </Link>

              </div>
            </div>
    </Col>
    </Row>
    </Container>
    </section>
  );
}

export default RegistrationForm;
