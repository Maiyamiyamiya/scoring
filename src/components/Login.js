import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Alert, Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/users");
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div style={{
          backgroundImage: `url(${require('./../images/karate.jpg')})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          justifyContent: 'center',
          alignContent: 'center',
          alignItem: 'center',
          height: '100vh',
          width: '100vw',
          marginTop: -20, 

      }}>
      <div>              
        <h2 style={{
                margin: 0, 
                color: '#05101c', 
                padding: 10,
                webkitTextStrokeWidth: '0.7px',
                webkitTextStrokeColor: '#fff',
                fontFamily: `'Anton', 'sans-serif'`,
                fontWeight: 400,
                fontSize: 30,
                fontStyle: 'normal',

        }}>ACCESS SCORING BOARD FOR KATA KARATE</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              style={{
              textColor: "#000",
              borderRadius: 30,
              height: 32,
              width: "50%",
              padding: 8,
              paddingLeft: 15,
              fontSize: 18,
              borderColor:"aquamarine",
              margin: 10
            }} 

              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              style={{
              textColor: "#000",
              borderRadius: 30,
              height: 32,
              width: "50%",
              padding: 8,
              paddingLeft: 15,
              fontSize: 18,
              borderColor:"aquamarine",
            }} 

              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" 
            className="button1"
            type="Submit"
            style={{
              borderRadius: 30,
              height: 48,
              width: "25%",
              marginTop: 15,
              border: 0,
              padding: 15,
              cursor: 'pointer'
            }}

            >
              LOGIN
            </Button>
          </div>
        </Form>
        
      </div>
    </div>
  );
};

export default Login;