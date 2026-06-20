import React, { useState } from "react";
import { Form, Button, Container, Spinner, Card, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { register } from "../store/login/action";
import { Link } from "react-router-dom";

const Register = ({ register, user }) => {
  const [body, setBody] = useState({
    username: "",
    email: "",
    password: "",
  });

  function validateForm() {
    return body.email.length > 0 && body.password.length > 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    register(body.username, body.email, body.password);
  };
  return (
    <Container className="mt-5">
      {user.error ? (
        <div className="justify-content-center col-lg-3 offset-lg-5">
          <Alert variant="danger">
            <p>{user.error.response.data.message}</p>
          </Alert>{" "}
        </div>
      ) : (
        ""
      )}
      <Card className="p-5 justify-content-center col-lg-6 offset-lg-3">
        <h1 className="text-center"> Signup</h1>
        <Form
          onSubmit={handleSubmit}
          className="justify-content-center col-lg-6 offset-lg-3"
        >
          <Form.Group className="mb-1" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              placeholder="Enter Username"
              value={body.username}
              onChange={(e) =>
                setBody((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={body.email}
              onChange={(e) =>
                setBody((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={body.password}
              onChange={(e) =>
                setBody((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </Form.Group>
          {!user.loading ? (
            <div className="text-center">
              <Button
                variant="primary"
                className="m-2"
                block="true"
                type="submit"
                disabled={!validateForm()}
              >
                Submit
              </Button>
            </div>
          ) : (
            <div className="text-center m-2">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
        </Form>
        <Link to="/login" className="text-center">
          Already a Member?
        </Link>
      </Card>
    </Container>
  );
};
const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};
export default connect(mapStateToProps, {
  register,
})(Register);
