// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Avatar, Box, IconButton } from "@mui/material";
import globalStyles from "../../styles";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ModalComments from "../modalComments";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { getCommentsByTask } from "../../services/comments";
import useAuthStore from "../../store/authStore";

// eslint-disable-next-line react/prop-types
const NewsTask = ({ task_id, title, date, header, description }) => {
  const [formatedDate, setformatedDate] = useState("");
  const [open, openchange] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  const { isAuthenticated } = useAuthStore();
  const { token } = isAuthenticated();

  const functionopenpopup = () => {
    openchange(true);
  };

  const closepopup = () => {
    openchange(false);
  };

  const getComments = async (task_id) => {
    try {
      const res = await getCommentsByTask(task_id, token);      
      setCommentsCount(res.data.length);     
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fecha = new Date(date);
    const opciones = { day: "numeric", month: "long" };
    const fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);
    setformatedDate(fechaFormateada);
    getComments(task_id)    
  }, [date]);

  return (
    <Box sx={globalStyles.paperNewTask}>
      <Box sx={header}></Box>

      <Typography variant="h6" color="#6161ff" sx={{ marginBottom: "8px" }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" sx={{ marginBottom: "8px" }}>
        {description}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Avatar y fecha */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            sx={{ width: 30, height: 30, marginRight: "1px" }}
          />
          <Typography variant="body2" color="textSecondary">
            {formatedDate}
          </Typography>
        </Box>

        <Box>
          <IconButton sx={{color:'#01c875'}} size="small" onClick={functionopenpopup}>
            <ArrowForwardIcon fontSize="small" />
          </IconButton>
          <IconButton sx={{color:'#fc275d'}} size="small" onClick={functionopenpopup}>
            <PersonAddAltIcon fontSize="small" />
          </IconButton>

          <IconButton sx={{color:'#6161ff'}} size="small" onClick={functionopenpopup}>
            <ChatBubbleOutlineIcon fontSize="small" />
            <Typography variant="body2" sx={{ marginLeft: "4px" }}>
              {commentsCount}
            </Typography>
          </IconButton>
        </Box>
      </Box>
      <ModalComments
          functionopenpopup={functionopenpopup}
          closepopup={closepopup}
          open={open}
          task_id={task_id}
          task_title={title}  // Add task_id as a prop to the ModalComments component for identifying the task.  // Add task_id as a prop to the ModalComments component for identifying the task
        />
    </Box>
  );
};

export default NewsTask;
