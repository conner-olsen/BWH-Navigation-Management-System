import { Container, Row, Col } from "react-bootstrap";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card.tsx";

export const Profile = () => {
  const { user } = useAuth0();

  return (
    <div>
      <Container className="mb-5">
        <br />
        <Row className="align-items-center profile-header mb-5 text-center text-md-left">
          <Col md={2}>
            <img
              src={user?.picture}
              alt="Profile"
              className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
            />
          </Col>
          <Col md>
            <h2>{user?.nickname}</h2>
          </Col>
        </Row>
        <Row>
          <Card className="max-w-md border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl">User data</CardTitle>
            </CardHeader>
            <CardContent>
              {/*{JSON.stringify(user, null, 2)}*/}

              <p>Username: {user?.nickname}</p>
              <p>Email: {user?.email}</p>
            </CardContent>
          </Card>
        </Row>
      </Container>
    </div>
  );
};

const ProfileWithAuthentication = withAuthenticationRequired(Profile, {
  onRedirecting: () => (
    <div>
      <p>Redirecting to User Page...</p>
    </div>
  ),
});

export default ProfileWithAuthentication;
