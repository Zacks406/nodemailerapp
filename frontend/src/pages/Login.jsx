import React, { useState } from "react";
import { Form, Button, Container, Spinner, Card, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { login } from "../store/login/action";
import { Link } from "react-router-dom";

const Login = ({ login, user }) => {
  const [body, setBody] = useState({
    email: "",
    password: "",
  });

  function validateForm() {
    return body.email.length > 0 && body.password.length > 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    login(body.email, body.password);
  };

  return (
    <Container className="mt-5">
      {user.error ? (
        <div className="justify-content-center col-lg-3 offset-lg-5">
          <Alert variant="danger text-center">
            <p>{user.error.response.data.message}</p>
          </Alert>{" "}
        </div>
      ) : (
        ""
      )}
      <Card className="p-5 justify-content-center col-lg-6 offset-lg-3">
        <h1 className="text-center"> Login</h1>
        <Form
          onSubmit={handleSubmit}
          className="justify-content-center col-lg-6 offset-lg-3"
        >
          <Form.Group className="mb-1" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              autoFocus
              value={body.email}
              onChange={(e) =>
                setBody((prev) => ({ ...prev, email: e.target.value }))
              }
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={body.password}
              onChange={(e) =>
                setBody((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder="Password"
            />
          </Form.Group>
          {!user.loading ? (
            <div className="text-center m-2">
              <Button
                variant="primary"
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
        <Link to="/register" className="text-center">
          Not a Member?
        </Link>
      </Card>
    </Container>
  );
};
const mapStateToProps = (state) => {
  // console.log(state.user.error.response.data.message);
  const { user } = state;
  return { user };
};
export default connect(mapStateToProps, {
  login,
})(Login);
