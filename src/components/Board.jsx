/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, {  useState } from "react";
import Grid from "@mui/material/Grid2";
import NewsTask from "../components/task/NewsTask";
import ButtonAddNew from "../components/task/ButtonAddNew";
import globalStyles from "../styles";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";

const Board = ({ tasks }) => {
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
        {tasks
          ?.filter((task) => task.status === "Pending")
          .map((task, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <NewsTask
                key={index}
                title={task.title}                
                description={task.description}
                date={task.createdAt}
                header={globalStyles.headerNewTask}
                task_id={task.id}
                asigned_at={task.asigned_at}
              />
            </motion.div>
          ))}
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
        {tasks
          ?.filter((task) => task.status === "InProgress")
          .map((task, index) => (            
            <NewsTask
              key={index}
              title={task.title}
              comments={task.comments}
              date={task.createdAt}
              header={globalStyles.headerInProgress}
              task_id={task.id}
            />
          ))}
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
        {tasks
          ?.filter((task) => task.status === "Done")
          .map((task, index) => (
            <NewsTask
              key={index}
              title={task.title}
              comments={task.comments}
              date={task.createdAt}
              header={globalStyles.headerDone}
              task_id={task.id}
            />
          ))}
      </Grid>
    </Grid>
  );
};

export default Board;
