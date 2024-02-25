import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import { MyContext } from "../../Context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "../../Axios";
import { Link } from "react-router-dom";
function AppNavbar() {
  const history = useHistory();
  const { user, setUser } = useContext(MyContext);
  const handleLogout = () => {
    axios.post("/logout").then(() => {
      localStorage.removeItem("token");
      setUser(null);
      history.replace("/");
    });
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/">Recipes App</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* <Nav.Link to="/">Home</Nav.Link> */}
          {!user && (
            <Nav className="me-auto">
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </>
            </Nav>
          )}
          {user && (
            <>
              <Nav.Link href="/my-favorites">Favorites</Nav.Link>
              <Nav.Link href="/logout" onClick={handleLogout}>
                Logout
              </Nav.Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
