import React from 'react'
import top from './about-top.png';
import './Blogs.css'
import Blog from './Blog';
function Blogs() {
  return (
    <div className='blog-container'>
        <center>
        <img src={top} alt="image" className='blog-img-top'/>
        <p className='blog-top-text'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt .
        </p>
        <Blog />
      </center>
     
    </div>
  )
}

export default Blogs
