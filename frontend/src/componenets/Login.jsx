import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('token',JSON.stringify(response.data));
      // Redirect to protected page
      window.location.href = '/protected';
    } catch (error) {
      console.error('Login failed:', error);
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

                <h3 className="mb-5 fs-1 text-center px-5 py-3 text-light   " style={{ backgroundColor: "#008080" }}>Sign in</h3>
                    </div>
                    <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="typeEmailX-2">
                  <Form.Label className="form-label text-start text-light  fs-5">Email</Form.Label>
                  <Form.Control className="form-control-lg" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-4" controlId="typePasswordX-2">
                  <Form.Label className="form-label fs-5 text-light  text-start">Password</Form.Label>
                  <Form.Control type="password" className="form-control-lg" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                {/* <Form.Group className="form-check d-flex justify-content-start mb-4">
                  <Form.Check type="checkbox" id="form1Example3" label="Remember password" />
                </Form.Group> */}
                
                <Button variant="primary"  className="btn-lg btn-block w-100" type="submit">Login</Button>
                </Form>
                <hr className="my-4"/>
                <Link to={"/register"} className=''>  
                <div className='text-center fs-5 text-light '>Create an account                    </div>  
             
      </Link>

              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Login;
