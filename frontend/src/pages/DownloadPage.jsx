import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Card, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { singleMailById } from '../store/mails/action';
import { resetUser, userMail } from '../store/login/action';
import fileDownload from 'js-file-download';
import axios from 'axios';

const DownloadPage = ({ user, useMail, singleMailById, mails, resetUser }) => {
  const params = useParams();
  let navigate = useNavigate();
  console.log(params.id);
  useEffect(() => {
    singleMailById(params.id);
  }, []);
  const logout = () => {
    localStorage.removeItem('user');
    resetUser();
    navigate('/login');
  };
  const [body, setBody] = useState({
    filePassword: '',
  });
  const handleDownload = (url, filename) => {
    if (body.filePassword !== mails.data.filePassword) {
      return;
    }
    axios
      .get(url, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
    setBody({ filePassword: '' });
    mails.data.imageUrl = '';
  };

  function validateForm() {
    return body.filePassword.length > 0;
  }

  const handleSubmit = (url, filename, event) => {
    event.preventDefault();
    axios
      .get(url, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });

    setBody({
      filePassword: '',
    });
  };

  return (
    <Container className="mt-5 center">
      <Card className="p-5">
        <h1 className="text-center"> DOWNLOAD PAGE</h1>

        <div className="top-button mb-2">
          <Button variant="primary" onClick={logout}>
            Logout
          </Button>
        </div>
        {/* <div className="mb-2 d-flex">
          <Link variant="primary" to="/">
            <Button>Downloads</Button>
          </Link>
        </div>
        */}
        <div className="mb-2 d-flex">
          <Link variant="primary" to="/">
            <Button>Downloads</Button>
          </Link>
        </div>

        {mails.data ? (
          <div className="text-center">
            <img src={mails.data.imageUrl} alt="Document not found" />

            <div className="mt-3">
              <button
                onClick={() => {
                  handleDownload(mails.data.imageUrl, 'lady.jpg');
                }}
              >
                Download
              </button>
            </div>
          </div>
        ) : (
          ''
        )}

        <Form
          onSubmit={handleSubmit}
          className="justify-content-center col-lg-6 offset-lg-3"
        >
          <Form.Group className="mb-3" controlId="filePassword">
            <Form.Label>Enter password:</Form.Label>
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
  const { user, mails } = state;
  return { user, mails };
};
export default connect(mapStateToProps, {
  userMail,
  resetUser,
  singleMailById,
})(DownloadPage);
