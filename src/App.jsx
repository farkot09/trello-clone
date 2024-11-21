// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Board from "./components/Board";
import LoginPage from "./pages/LoginPage";
import Grid from "@mui/material/Grid2";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useAuthStore from "./store/authStore";

const App = () => {
  const { isAuthenticated } = useAuthStore();
  const { isAuth } = isAuthenticated();
  useEffect(() => {
    console.log(isAuthenticated());
  }, [isAuthenticated]);

  return (
    <Router>
      {!isAuth ? <LoginPage /> : ""}
      <Grid container spacing={2}>
        <Grid size={12}>{isAuth ? <Navbar /> : ""}</Grid>
        <Grid size={12} sx={{ paddingTop: "14px" }}>
          {isAuth ? (
            <Routes>
              <Route path="/" element={<Board />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </Router>
  );
};

export default App;
