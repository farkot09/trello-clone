import React from "react";
import Typography from "@mui/material/Typography";
import { IconButton, Paper } from "@mui/material";
import globalStyles from "../../styles";
import AddIcon from '@mui/icons-material/Add';

const ButtonAddNew = () => {
    return (
        <Paper
          elevation={3}
          sx={globalStyles.buttonNewTask}
        >
          <IconButton>
            <AddIcon sx={{ color: "#9e9e9e" }} />
          </IconButton>
        </Paper>
      );
    };

export default ButtonAddNew;
