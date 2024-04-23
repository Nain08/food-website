import React, { useState } from 'react'
import img from './contactus-img.jpg'
import { Form, Button, Alert } from "react-bootstrap";
import './contactUs.css'
function ContactUs() {
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [email,setEmail]=useState("");
  const [message,setMessage]=useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);

  try {
    await delay(500);
    const response = await fetch('http://localhost:3001/addCustomerDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, message }),
    });

    if (response.ok) {
      console.log('Contact saved successfully');
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      window.alert('Data saved successfully');
      
    } else {
      console.error('Failed to save contact');
      
    }
  } catch (error) {
    console.error('Error:', error);
  }

  setLoading(false);
};
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  return (
    <div className='contact-background'>
      <div className='contact-container'>
        <div className='row justify-content-center'>
          <div className='col-md-6 '>
            <Form onSubmit={handleSubmit}>
              <div className="h4 text-center contact-heading">
                <p className='contact-heading' >Request a </p>
                <p className='contact-heading'style={{color:'white'}}>Call Back</p> 
              </div>
              <Form.Group className="mb-2 mt-5" controlId="name">
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                  className='contact-inputs'
                />
              </Form.Group>
            
              <Form.Group className="mb-2" controlId="email">
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='contact-inputs'
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="phone">
                <Form.Control
                  type="tel"
                  value={phone}
                  placeholder="Phone"
                  onChange={(e) => setPhone(e.target.value)}
                  className='contact-inputs'
                  required
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="message">
                <Form.Control
                  as="textarea"
                  value={message}
                  placeholder="Message"
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}  
                  className='contact-inputs'
                />
              </Form.Group>
              <Button variant="light" type="submit" className='contact-send-btn'>
                    Send
              </Button>
            </Form>
          </div>
          <div className='col-md-6'>
            <img src={img} alt="image" className='contact-img'/>
          </div>
        </div>
      </div>
    </div>
  
  )
}

export default ContactUs
