import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidenav from "./Sidenav";
import Users from "./components/Users/Users";
import Todos from "./components/Todos/Todos";
import Posts from "./components/Posts/Posts";
import Photos from "./components/Photos/Photos";
import Albums from "./components/Albums/Albums";
import Comments from "./components/Comments/Comments";
import LoginPage from "./components/LoginPage/LoginPage";
import { Snackbar, Alert } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Json from "../src/assets/json-file.png";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  const handleLogin = (email, password, rememberMe) => {
    if (email === "Login" && password === "123") {
      setIsAuthenticated(true);
      setOpenSnackbar(true);
      if (rememberMe) {
        localStorage.setItem("isAuthenticated", "true");
      } else {
        sessionStorage.setItem("isAuthenticated", "true");
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("isAuthenticated");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Router>
      <div style={{ display: "flex" }}>
        {isAuthenticated ? (
          <>
            <Sidenav onLogout={handleLogout} />
            <main style={{ flexGrow: 1, padding: "16px" }}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <div>
                      <h2>
                        {" "}
                        <ArrowCircleLeftIcon /> Chap tomondan page tanlab bosing{" "}
                      </h2>
                    </div>
                  }
                />
                <Route path="/users" element={<Users />} />

                <Route path="/todos" element={<Todos />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/photos" element={<Photos />} />
                <Route path="/albums" element={<Albums />} />
                <Route path="/comments" element={<Comments />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
              <img
                src={Json}
                style={{
                  width: "70px",
                  position: "relative",
                  height: "auto",
                  right: "110px",
                  bottom: "370px",
                }}
              />
            </main>
          </>
        ) : (
          <Routes>
            <Route
              path="/login"
              element={<LoginPage onLogin={handleLogin} />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Successfully logged in!
        </Alert>
      </Snackbar>
    </Router>
  );
}

export default App;
