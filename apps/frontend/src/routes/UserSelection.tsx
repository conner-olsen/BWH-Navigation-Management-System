import { Outlet } from "react-router-dom";
import { Container, Row, Col, Image, Stack } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LargeButton from "../components/LargeButton.tsx";

const UserSelection = () => {
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
            <LargeButton title={"Login as Guest"}></LargeButton>

            <LargeButton title={"Login as Patient"}></LargeButton>

            <LargeButton title={"Login as Administrator"}></LargeButton>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default UserSelection;
