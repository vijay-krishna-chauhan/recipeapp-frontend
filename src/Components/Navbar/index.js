// 

import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { MyContext } from "../../Context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "../../Axios";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

function AppNavbar() {
  const history = useHistory();
  const { user, setUser } = useContext(MyContext);

  const handleLogout = () => {
    console.log("Logging out..."); // Add this line
    axios.post("/logout").then(() => {
      localStorage.removeItem("token");
      setUser(null);
      history.replace("/");
    }).catch(error => {
      console.error("Logout failed:", error); // Add this line
    });
  };
  

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Recipes App</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {!user ? (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <>
                <LinkContainer to="/my-favorites">
                  <Nav.Link>Favorites</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
