// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { IconButton, Paper } from "@mui/material";
import globalStyles from "../../styles";
import AddIcon from "@mui/icons-material/Add";
import ModalNewTask from "../ModalNewTask";
import {useDroppable} from '@dnd-kit/core';

const ButtonAddNew = ({id, color}) => {
  const [open,openchange]=useState(false);
  const {isOver, setNodeRef} = useDroppable({
    id: id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  const functionopenpopup = () => {
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
  };

  return (
    <Paper ref={setNodeRef} elevation={3} sx={{...globalStyles.buttonNewTask, border: isOver ? " 2px dashed green" : color}} style={style} component={"div"}>
      <IconButton onClick={() => {
        if(id === "Pending")functionopenpopup();          
      }}>
        <AddIcon sx={{ color: "#9e9e9e" }} />
      </IconButton>
      <ModalNewTask  functionopenpopup={functionopenpopup} closepopup={closepopup} open={open} />
    </Paper>
  );
};

export default ButtonAddNew;
