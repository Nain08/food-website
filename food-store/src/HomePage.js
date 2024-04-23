import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './HomePage.css';
import homeImg from './burger.png';
import { Link } from 'react-router-dom';


function HomePage() {
  const authToken = localStorage.getItem('authToken');
  const isLoggedIn = authToken !== null;
  console.log('IsLoggedIn',isLoggedIn);

  return (
    <>
    <div className='home-background'>
      <div className='home-left'>
        <p className='home-heading'>Discover</p>
        <p className='home-heading'>Restaurants</p>
        <p className='home-heading'>that deliver near</p>
        <p className='home-heading'>You</p>
        <p className='home-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        {isLoggedIn ? (
          <Link to='/recipes'>
            <Button variant="outline-light" className='home-order-btn'>Order Now</Button>
          </Link>
        ) : (
          <Link to='/login'>
            <Button variant="outline-light" className='home-order-btn'>Order Now</Button>
          </Link>
        )}
      </div>
      <div className='home-right'>
        <img src={homeImg} alt="image" className='home-img' />
      </div>
    </div>
    </>
  );
}

export default HomePage;
