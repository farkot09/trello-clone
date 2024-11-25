// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import BoardPage from "./pages/Boardpage";
import TaskPage from "./pages/TaskPage";
import Grid from "@mui/material/Grid2";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useAuthStore from "./store/authStore";
import Logout from "./components/Logout";
import AssignedTasks from "./pages/AssignedTasks";

const App = () => {
  const { isAuthenticated, setToken } = useAuthStore();
  const { isAuth, token } = isAuthenticated();
  const tokenLocal = localStorage.getItem("token");

  useEffect(() => {
    if (tokenLocal && !isAuth) {
      setToken(tokenLocal);
    }
  }, [tokenLocal, isAuth]);
  

  return (
    <Router>
      {!isAuth ? <LoginPage /> : ""}
      <Grid container spacing={2}>
        <Grid size={12}>{isAuth ? <Navbar /> : ""}</Grid>
        <Grid size={12} sx={{ paddingTop: "14px" }}>
          {isAuth ? (
            <Routes>
              <Route path="/board" element={<BoardPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/tasks/:boardId" element={<TaskPage />} />
              <Route path="/assigned_tasks" element={<AssignedTasks />} />
              <Route path="/logout" element={<Logout />}/>
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
