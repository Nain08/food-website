import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import {  useNavigate } from "react-router-dom";
import "./login.css";
import { Link } from "react-router-dom";
import BackgroundImage from "./background.jpg";
import { useUser } from './UserContext';

const Login = () => {
  const navigate = useNavigate();
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { loginUser } = useUser();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/getUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: inputUsername,
          password: inputPassword,
        }),
      });

      if (response.ok)
       {
        const data = await response.json();
        
        if (data.authenticated) {
          console.log("User authenticated successfully");
          console.log("Received user data:", data);
          loginUser({ username: data.name, token: data.token });
          localStorage.setItem("userName",data.name);
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("loggedIn",true);
          setInputUsername("");
          setInputPassword("");
          setTimeout(()=>{

            navigate("/");
            window.location.reload(true);
          },100);
          
          
        } else {
          setShowError(true);
          console.error("Incorrect username or password");
        }
      } else {
        setShowError(true);
        console.error("Authentication failed");
      }
    } catch (error) {
      setShowError(true);
      console.error("Error during authentication:", error);
    }

    setLoading(false);
  };
  return (
    <>
    
    
    <div className="sign-in__wrapper" style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <div className="sign-in__backdrop"></div>
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <div className="h4 mb-2 text-center">Sign In</div>
        {showError && (
          <Alert className="mb-2" variant="danger" onClose={() => setShowError(false)} dismissible>
            Incorrect username or password.
          </Alert>
        )}
        <Form.Group className="mb-2" controlId="username">
          <Form.Control
            type="text"
            value={inputUsername}
            placeholder="Username"
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Control
            type="password"
            value={inputPassword}
            placeholder="Password"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="w-100" variant="dark" type="submit" disabled={loading}>
          {loading ? "Logging In..." : "Log In"}
        </Button>
        <div className="mt-2 text-center">
          Not a user? <Link to="/register" style={{color: "black"}}>Register</Link>
        </div>
      </Form>
    </div>
    </>
  );
};

export default Login;
