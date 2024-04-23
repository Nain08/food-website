import React, { useState } from 'react';
import './About.css';
import right from './about-right.jpg';
import top from './about-top.png';

function About() {
  const [showDialog, setShowDialog] = useState(false);
  const [showTopModal, setShowTopModal] = useState(false);

  const handleReadMoreClick = () => {
    setShowDialog(true);
  };

  const handleShowTopModal = () => {
    setShowTopModal(true);
  };

  const handleCloseTopModal = () => {
    setShowTopModal(false);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <div className='about-container'>
      <center>
        <img src={top} alt="image" className='about-img-top'/>
        <p className='about-top-text'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
          et dolore magna aliqua. Dolor sed viverra ipsum nunc aliquet. 
        </p>
      </center>
      <div className='about-body'>
        <div className='about-left'>
          <p className='about-left-text'>
            <h4>Best Food</h4>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                dolore magna aliqua. Dolor sed viverra ipsum nunc aliquet. Interdum velit laoreet id donec ultrices 
                tincidunt. Purus in massa tempor nec.
            <span className='read-more-link' onClick={handleReadMoreClick}>Read More</span>
          </p>
        </div>
        <div className='about-right'>
          <img src={right} alt="image" className='about-img-right' />
        </div>
      </div>

      {showDialog && (
        <div className='dialog-overlay' onClick={handleCloseDialog}>
          <div className='dialog-content'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                dolore magna aliqua. Dolor sed viverra ipsum nunc aliquet. Interdum velit laoreet id donec ultrices 
                tincidunt. Purus in massa tempor nec.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                dolore magna aliqua. Dolor sed viverra ipsum nunc aliquet. Interdum velit laoreet id donec ultrices 
                tincidunt. Purus in massa tempor nec.</p>
            <button onClick={handleCloseDialog} className='modal-close-btn'>Close</button>
          </div>
        </div>
      )}

      {showTopModal && (
        <div className='top-modal-overlay' onClick={handleCloseTopModal}>
          <div className='top-modal-content'>
            <p>This is the top modal content...</p>
            <button onClick={handleCloseTopModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default About;
