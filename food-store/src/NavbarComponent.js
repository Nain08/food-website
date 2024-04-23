import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { Link, NavLink,Outlet } from 'react-router-dom';
import "./NavbarComponent.css";
import logo from './foodPointLogo.jpg';
import { useUser} from './UserContext';

function NavbarComponent() {
  const { user, logoutUser} = useUser();
  
  const authToken = localStorage.getItem('authToken');
  const isLoggedIn = authToken !== null;
  const userName=localStorage.getItem('userName');
  const loggedIn=localStorage.getItem('loggedIn');
  console.log('isLoggedIn',isLoggedIn);
  
  const handleLogout = () => {
    
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('loggedIn');
    logoutUser();
    window.location.href = '/login';
  };

  return (
    <>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant='dark' className='nav fixed-top' >
          <Container>
            <Navbar.Brand as={Link} to="/" className='left-nav'>
              <Image src={logo} alt="Brand Logo" className="d-inline-block img-logo" />
              {' FOOD POINT'}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
              </Nav>
              <Nav className="right-nav">
                <NavLink to="/" exact="true" className='nav-links' activeclassname='active'>Home</NavLink>
                {isLoggedIn && (
                  <>
                    <NavLink to="/about" className='nav-links' activeclassname='active'>About</NavLink>
                    <NavLink to="/recipes" className='nav-links' activeclassname='active'>Recipe</NavLink>
                    <NavLink to="/blogs" className='nav-links' activeclassname='active'>Blog</NavLink>
                    <NavLink to="/contact" className='nav-links' activeclassname='active'>Contact Us</NavLink>
                  </>
                )}
                {isLoggedIn ? (
                  <>
                    <Button variant="outline-light" className='nav-btn-close' onClick={handleLogout}>Logout</Button>
                    {loggedIn?(<p style={{color:"white", marginTop:"1rem", marginLeft:"1rem"}}>Welcome, {userName}</p>):(<></>)}
                    
                  </>
                  
                  ) : (
                  <>
                    <Link to="/login">
                      <Button variant="warning" className='nav-btn'>Login</Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="outline-light" className='nav-btn'>Register</Button>
                    </Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      </div>
      <Outlet />
    </>
  );
}

export default NavbarComponent;
