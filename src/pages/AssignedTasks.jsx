import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { getTasksAssignedByuserId } from "../services/tasks";
import useAuthStore from "../store/authStore";
import TaskCard from "../components/TaskCard";
const AssignedTasks = () => {
  const [tasks, setTasks] = useState([]);

  const { isAuthenticated } = useAuthStore();
  const { id, token } = isAuthenticated();

  useEffect(() => {
    getTasksAssignedByuserId(id, token).then((response) => {
      setTasks(response.data); // Mostrar las tareas en la consola para debuguear
    });
  }, []);

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
      <Grid size={{ md: 1, xs: 12 }}></Grid>
      <Grid size={{ md: 10, xs: 12 }}>
        {tasks.map((task) => (
          <Grid key={task.id} size={{ md: 10, xs: 12 }}>
            <TaskCard title={task.title} status={task.status} />
          </Grid>
        ))}
      </Grid>
      <Grid size={{ md: 1, xs: 12 }}></Grid>
    </Grid>
  );
};

export default AssignedTasks;
