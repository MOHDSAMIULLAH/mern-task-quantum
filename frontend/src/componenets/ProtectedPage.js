// ProtectedPage.js
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import dayjs from 'dayjs'
import axios from 'axios';
function ProtectedPage() {
    const [users, setUsers] = useState([]);
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
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
        console.log(response.data,"users");
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className='text-center'>Welcome, {data?.user?.name}!</h1>
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
