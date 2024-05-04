// ProtectedPage.js
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import dayjs from 'dayjs'
import axios from 'axios';
import { Link } from 'react-router-dom';
import ToastBoot from './Toast';

function ProtectedPage() {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [bg, setBg] = useState("info");
  // Retrieve user information from localStorage

  
  const data = JSON.parse(localStorage.getItem('token'));
  console.log(data,"user data")
  // If user is not logged in, redirect to login page
  if (!data) {
    window.location.href = '/';
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://mern-task-quantum.onrender.com/users');
        setUsers(response.data);
        console.log(response.data,"users");
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem('token');
      
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className='px-4'>
      <ToastBoot show={show} setShow={setShow} msg={msg} bg={bg} className="h-25" />
      <div className='d-flex py-5 justify-content-around'>
      <h1 className='text-center'>Welcome, {data?.user?.name}!</h1>
      <Button variant="primary" onClick={handleLogout} className="btn-lg " >Logout</Button>
      </div>

      <h2>Here are all users:</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Hashed Password</th>
          </tr>
        </thead>
        <tbody>
         
          {users && users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{dayjs(user.dob).format('DD/MM/YYYY')}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProtectedPage;
