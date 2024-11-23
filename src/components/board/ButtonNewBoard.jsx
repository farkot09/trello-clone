// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { IconButton, Paper } from "@mui/material";
import globalStyles from "../../styles";
import AddIcon from "@mui/icons-material/Add";
import ModalNewboard from "./ModalNewBoard";

const ButtonNewBoard = () => {
  const [open,openchange]=useState(false);
  const functionopenpopup = () => {
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
  };

  return (
    <Paper elevation={3} sx={globalStyles.buttonNewTask}>
      <IconButton onClick={functionopenpopup}>
        <AddIcon sx={{ color: "#9e9e9e" }} />
      </IconButton>
      <ModalNewboard  functionopenpopup={functionopenpopup} closepopup={closepopup} open={open} />
    </Paper>
  );
};

export default ButtonNewBoard;