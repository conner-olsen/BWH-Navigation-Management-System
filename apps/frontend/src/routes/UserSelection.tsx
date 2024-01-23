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
            className="img-fluid"
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
            <LargeButton
              onClick={handleGuestLoginClick}
              title={"Login as Guest"}
            ></LargeButton>

            <LargeButton
              onClick={handlePatientLoginClick}
              title={"Login as Patient"}
            ></LargeButton>

            <LargeButton
              onClick={handleAdminLoginClick}
              title={"Login as Administrator"}
            ></LargeButton>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default UserSelection;
