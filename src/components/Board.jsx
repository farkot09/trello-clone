// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import NewsTask from "../components/task/NewsTask";
import ButtonAddNew from "../components/task/ButtonAddNew";
import globalStyles from "../styles";
import { Typography } from "@mui/material";
import { getTaskByUser } from "../services/tasks";
import useAuthStore from "../store/authStore";

const Board = () => {
  const [ListTasks, setListTasks] = useState([]);
  const { isAuthenticated } = useAuthStore();
  const { id, token } = isAuthenticated();

  useEffect(() => {
    getTaskByUser(id, token).then((response) => {
      setListTasks(response.data);      
    });
  }, [id, token]);


  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginLeft: "10px",
        marginRight: "10px",
      }}
    >
      {/* Reder Tareas Pendientes */}
      <Grid size={{ md: 3, xs: 12 }}>
        <Typography
          variant="h5"
          color="textSecondary"
          sx={{ textAlign: "center" }}
        >
          News Task
        </Typography>
        <ButtonAddNew />
        {ListTasks?.filter((task) => task.status === "Pending").map(
          (task, index) => (
            <NewsTask
              key={index}
              title={task.title}
              comments={task.comments}
              date={task.createdAt}
              header={globalStyles.headerNewTask}
            />
          )
        )}
      </Grid>
      {/* Reder Tareas En Progreso */}
      <Grid size={{ md: 3, xs: 12 }}>
        <Typography
          variant="h5"
          color="textSecondary"
          sx={{ textAlign: "center" }}
        >
          In Progress
        </Typography>
        <ButtonAddNew />
        {ListTasks?.filter((task) => task.status === "InProgress").map(
          (task, index) => (
            <NewsTask
              key={index}
              title={task.title}
              comments={task.comments}
              date={task.createdAt}
              header={globalStyles.headerInProgress}
            />
          )
        )}
      </Grid>
      {/* Reder Tareas Terminadas */}
      <Grid size={{ md: 3, xs: 12 }}>
        <Typography
          variant="h5"
          color="textSecondary"
          sx={{ textAlign: "center" }}
        >
          Done
        </Typography>
        <ButtonAddNew />
        {ListTasks?.filter((task) => task.status === "Done").map(
          (task, index) => (
            <NewsTask
              key={index}
              title={task.title}
              comments={task.comments}
              date={task.createdAt}
              header={globalStyles.headerDone}
            />
          )
        )}
      </Grid>
    </Grid>
  );
};

export default Board;
