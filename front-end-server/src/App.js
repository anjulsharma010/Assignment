// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import UserDetails from './userDetails';

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
                    <Route path="/user-details" element={<PrivateRoute component={UserDetails} />} />
                </Routes>
            </Router>
        </UserProvider>
    );
};

// Private route component
const PrivateRoute = ({ component: Component }) => {
    const token = localStorage.getItem('token');
    return token ? <Component /> : <Navigate to="/login" />;
};

export default App;
