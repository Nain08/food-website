import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./Register.css"; 
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";
import BackgroundImage from "./background.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Make a request to your server to register the user
      const response = await fetch('http://localhost:3001/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          userName,
          phone,
          address,
          email,
          password,
        }),
      });

      if (response.ok) {
        console.log('User registered successfully');
        setName("");
        setUserName("");
        setPhone("");
        setAddress("");
        setEmail("");
        setPassword("");
        window.alert("Registered successfully. Kindly login")
        navigate("/login"); 
      } 
      else {
        const errorData = await response.json();
        setShowError(true);
        setErrorMessage(errorData.message);
        console.error('Registration failed:', errorData.message);
      }
    } catch (error) {
      setShowError(true);
      setErrorMessage('Error during registration. Please try again.');
      console.error('Error during registration:', error);
    }

    setLoading(false);
  };

  return (
    <div className="registration__wrapper" style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <div className="registration__backdrop"></div>
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <div className="h4 mb-2 text-center">Register</div>
        {showError && (
          <Alert className="mb-2" variant="danger" onClose={() => setShowError(false)} dismissible>
            {errorMessage}
          </Alert>
        )}
        <Form.Group className="mb-2" controlId="name">
          <Form.Control
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="userName">
          <Form.Control
            type="text"
            value={userName}
            placeholder="User Name"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="phone">
          <Form.Control
            type="tel"
            value={phone}
            placeholder="Phone"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="address">
          <Form.Control
            type="text"
            value={address}
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="email">
          <Form.Control
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="dark" type="submit">
            Register
          </Button>
        ) : (
          <Button className="w-100" variant="dark" type="submit" disabled>
            Registering...
          </Button>
        )}
        <div className="mt-2 text-center">
          Already a user? <Link to="/login" style={{color: "black"}}>Login</Link>
        </div>
      </Form>
    </div>
  );
};

export default Register;

