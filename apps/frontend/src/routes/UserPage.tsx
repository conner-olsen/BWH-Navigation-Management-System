import { Container, Row, Col } from "react-bootstrap";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../components/ui/card.tsx";
import NavBar from "../components/NavBar.tsx";
export const Profile = () => {
    const { user } = useAuth0();

    return (
        <div>
            <NavBar />
        <Container className="mb-5">
            <Row className="align-items-center profile-header mb-5 text-center text-md-left">
                <Col md={2}>
                    <img
                        src={user.picture}
                        alt="Profile"
                        className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                    />
                </Col>
                <Col md>
                    <h2>{user.name}</h2>
                    <p className="lead text-muted">{user.email}</p>
                </Col>
            </Row>
            <Row>
                <Card className="max-w-md border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-xl">User data</CardTitle>
                        <CardDescription className="text-sm">Here is all the information we have on this user:</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {JSON.stringify(user, null, 2)}
                    </CardContent>
                </Card>
            </Row>
        </Container>
        </div>
    );
};

export default withAuthenticationRequired(Profile, {
    onRedirecting: () => <div><p>Redirecting to User Page...</p></div>,
});
