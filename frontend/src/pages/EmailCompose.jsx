import React, { useState } from 'react';
import { Form, Button, Container, Card, Spinner, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { userMail } from '../store/login/action';
import { Link } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import Uploader from '../components/Uploader';
import generate from 'generate-password';

const EmailCompose = ({ userMail, user }) => {
  const [filePassword, setfilePassword] = useState({ filePassword: '' });
  const editorStyle = { border: '1px solid #565c65', height: '10rem' };
  const toolbar = {
    options: ['inline', 'blockType', 'list'],
    inline: {
      inDropdown: false,
      className: undefined,
      component: undefined,
      dropdownClassName: undefined,
      options: ['bold', 'italic', 'underline', 'strikethrough'],
    },
    blockType: {
      inDropdown: true,
      options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
    },
    list: {
      inDrodown: false,
      options: ['unordered', 'ordered'],
    },
  };

  const handleChange = (e) => {
    const html = draftToHtml(e);
    setBody((prev) => ({ ...prev, description: html }));

    setfilePassword(
      generate.generate({
        length: 10,
        numbers: true,
      })
    );
  };

  const [body, setBody] = useState({
    emailTo: '',
    subject: '',
    description: '',
    // filePassword: '',
  });

  function validateForm() {
    return body.emailTo.length > 0 && body.subject.length > 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    userMail(
      body.emailTo,
      body.subject,
      body.description,
      filePassword,
      imageUrl
    );
    setBody({
      emailTo: '',
      subject: '',
      description: '',
      //filePassword: '',
    });
  };
  const [imageUrl, setImageUrl] = useState({
    setImageUrl: '',
  });

  return (
    <Container className="mt-5 center">
      {user.error ? (
        <div className="justify-content-center col-lg-3 offset-lg-5">
          <Alert variant="danger">
            <p>{user.error.response.data.message}</p>
          </Alert>{' '}
        </div>
      ) : (
        ''
      )}
      {user.data?.message ? (
        <div className="justify-content-center col-lg-3 offset-lg-5">
          <Alert variant="success">
            <p>{user.data.message}</p>
          </Alert>{' '}
        </div>
      ) : (
        ''
      )}
      <Card className="p-5">
        {user.data ? (
          <div className="justify-content-center col-lg-3 offset-lg-5">
            <p>{user.data.message}</p>
          </div>
        ) : (
          ''
        )}
        <h1 className="text-center"> MAILER APP</h1>
        <div className="col-span-8 sm:col-span-4">
          <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
        </div>
        <div className="mb-2 text-center mt-2">
          <Link to="/">
            <Button variant="primary">All mails</Button>
          </Link>
        </div>
        <Form
          onSubmit={handleSubmit}
          className="justify-content-center col-lg-6 offset-lg-3"
        >
          <Form.Group className="mb-3" controlId="emailTo">
            <Form.Label>To:</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              placeholder="Enter email"
              value={body.emailTo}
              onChange={(e) =>
                setBody((prev) => ({ ...prev, emailTo: e.target.value }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="subject">
            <Form.Label>Subject:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Subject"
              value={body.subject}
              onChange={(e) =>
                setBody((prev) => ({ ...prev, subject: e.target.value }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Text</Form.Label>
            <Editor
              defaultEditorState={body.description}
              editorStyle={editorStyle}
              toolbar={toolbar}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="filePassword">
            <Form.Label>File Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="FilePassword"
              value={body.filePassword}
              onChange={(e) =>
                setBody((prev) => ({ ...prev, filePassword: e.target.value }))
              }
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
      </Card>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};
export default connect(mapStateToProps, {
  userMail,
})(EmailCompose);
