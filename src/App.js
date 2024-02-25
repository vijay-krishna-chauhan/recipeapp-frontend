import logo from "./logo.svg";
import { useContext, useEffect } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/index";
import Home from "./Pages/Home";
import axios from "./Axios";
import { MyContext } from "./Context";
import { Route, BrowserRouter, Router, Switch } from "react-router-dom";
import ErrorPage from "./Pages/404/404";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Favorites from "./Pages/Favorites/Favorites";

function App() {
  const { user, setUser } = useContext(MyContext);
  useEffect(() => {
    axios.post("/auto-login").then(({ data }) => setUser(data));
  }, []);
  return (
    <BrowserRouter>
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        {!user && (
          <>
            {" "}
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
          </>
        )}
        {user && (
          <Route exact path="/my-favorites">
            <Favorites/>
          </Route>
        )}

        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
    </BrowserRouter>
  );
}

export default App;
