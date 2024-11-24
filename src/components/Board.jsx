/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, {  useState } from "react";
import Grid from "@mui/material/Grid2";
import NewsTask from "../components/task/NewsTask";
import ButtonAddNew from "../components/task/ButtonAddNew";
import globalStyles from "../styles";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { DndContext} from '@dnd-kit/core';
import { changeStatusTask } from "../services/tasks";
import useTaskStore from "../store/taskStore";

const Board = ({ tasks, setTasks, titleBoard }) => {
  const { setChanges } = useTaskStore();

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!active ||!over) return;
    const task = tasks.find((t) => t.id === active.id);
    if (!task) return;
    task.status = over.id;
    const data = { id: task.id, status: task.status };    
    const res = await changeStatusTask(active.id,data, task);
    if (!res.status === 200) return console.log(res);
    setTasks([...tasks]);
    setChanges(task)    
  }

  return (
    <DndContext onDragEnd={handleDragEnd} >      
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
        <ButtonAddNew id={"Pending"} color={"2px solid #c1c928"} />
        <Box sx={{...globalStyles.boxListask, border:'2px solid #c1c928'}}>        
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
          </Box>
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
          <ButtonAddNew id={"InProgress"} color={"2px solid #007bff"} />
          <Box sx={{...globalStyles.boxListask, border:'2px solid #007bff'}} > 
                {tasks
          ?.filter((task) => task.status === "InProgress")
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
      </Box> 
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
        <ButtonAddNew id={"Completed"} color={"2px solid #e158a0"}  />
        <Box sx={{...globalStyles.boxListask, border:'2px solid #e158a0'}} > 
        {tasks
          ?.filter((task) => task.status === "Completed")
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
      </Box> 
      </Grid>
    </Grid>
    </DndContext>
  );
};

export default Board;
