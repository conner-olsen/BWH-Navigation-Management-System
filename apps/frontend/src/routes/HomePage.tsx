import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <Container fluid>
      <Outlet />
      <h1>Home</h1>
    </Container>
  );
};

export default HomePage;
