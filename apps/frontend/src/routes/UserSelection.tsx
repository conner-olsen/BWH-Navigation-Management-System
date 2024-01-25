import { Outlet } from "react-router-dom";
import { Container, Row, Col, Image, Stack } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LargeButton from "../components/LargeButton.tsx";
import { useNavigate } from "react-router-dom";

const UserSelection: React.FC = () => {
  const navigate = useNavigate();

  const handlePatientLoginClick = () => {
    // Use the navigate function to redirect to the PatientLogin page
    navigate("/PatientLogin");
  };

  const handleAdminLoginClick = () => {
    navigate("/AdminLogin");
  };

  const handleGuestLoginClick = () => {
    navigate("/HomePage");
  };

  return (
    <Container fluid>
      <Outlet />
      <Row>
        <Col md={6}>
          <Image
            className="hospitalImage img-fluid"
            src="public/hospital.jpeg"
            alt="Hospital Image"
            fluid
          />
        </Col>
        <Col md={6}>
          <Stack className="stack" gap={5}>
            <div className="SignInBox">
              <br />
              <p>
                <b>Sign in</b>
              </p>
            </div>
            <LargeButton onClick={handleGuestLoginClick}>
                <h1> Login as Guest</h1>
            </LargeButton>

              <LargeButton onClick={handlePatientLoginClick}>
                  <h1> Login as Patient</h1>
              </LargeButton>

              <LargeButton onClick={handleAdminLoginClick}>
                  <h1> Login as Admin</h1>
              </LargeButton>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default UserSelection;
