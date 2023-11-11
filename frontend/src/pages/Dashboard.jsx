import React, { useEffect } from 'react';
import { Container, Card, Table, Button, Placeholder } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { allMails, singleMail, singleMailById } from '../store/mails/action';
import { resetUser } from '../store/login/action';
const Dashboard = ({ allMails, mails, user, resetUser }) => {
  let navigate = useNavigate();
  const id = '646218c4318fda760c18a5de';
  useEffect(() => {
    allMails();
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    resetUser();
    navigate('/login');
  };

  return (
    <Container className="mt-5 center">
      <div className="top-button mb-2">
        <Button variant="primary" onClick={logout}>
          Logout
        </Button>
      </div>
      <Card className="p-5">
        <h1 className="text-center"> MAILER APP</h1>
        <div className="mb-2 d-flex">
          <Link variant="primary" to="/compose">
            <Button>Compose</Button>
          </Link>
          <Link variant="primary" to={`/download/${id}`}>
            <Button>Downloads</Button>
          </Link>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Recipient's Name</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          {!mails.loading ? (
            <tbody>
              {mails.data?.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.emailTo}</td>
                    <td>{data.subject}</td>
                    <td>{data.createdAt.split('T')[0]}</td>
                    <td>{data.createdAt.split('T')[1].split('Z')}</td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <Placeholder as="tbody" animation="glow">
              <Placeholder as="tr" xs={12} />
            </Placeholder>
          )}
        </Table>
      </Card>
    </Container>
  );
};
const mapStateToProps = (state) => {
  const { mails } = state;
  return { mails };
};
export default connect(mapStateToProps, {
  allMails,
  resetUser,
  singleMail,
  singleMailById,
})(Dashboard);
