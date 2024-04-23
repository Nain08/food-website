// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import NavbarComponent from './NavbarComponent';
import Login from './Login';
import Register from './Register';
import ContactUs from './ContactUs';
import About from './About';
import Recipes from './Recipes';
import Blogs from './Blogs';
import { UserProvider } from './UserContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check authentication status here
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
    <UserProvider>
      <BrowserRouter>
        <NavbarComponent  />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {isLoggedIn && (
            <>
              <Route path="/about" element={<About />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/contact" element={<ContactUs />} />
            </>
          )}
          <Route
            path="/login"
            element={<Login/>}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
