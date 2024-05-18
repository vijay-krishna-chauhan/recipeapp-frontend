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

  // useEffect(() => {
  //   axios.post("/auto-login").then(({ data }) => setUser(data));
  // }, []);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Token found, proceed with auto-login
      axios.post('/auto-login')
        .then(({ data }) => {
          // Auto-login successful, set user context
          setUser(data);
        })
        .catch((error) => {
          console.error('Auto-login failed:', error);
          // Handle auto-login failure (e.g., clear invalid token)
          localStorage.removeItem('token');
        });
    }
  }, []);

  return (
    <BrowserRouter>
   
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
    </BrowserRouter>
  );
}

export default App;
