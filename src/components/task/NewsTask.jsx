// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Avatar, Box, IconButton } from "@mui/material";
import globalStyles from "../../styles";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ModalComments from "../ModalComments";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { getCommentsByTask } from "../../services/comments";
import useAuthStore from "../../store/authStore";
import useTaskStore from "../../store/taskStore";
import useBoardStore from "../../store/boardStore";
import ModalAssingTask from "../ModalAssingTask";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities'

// eslint-disable-next-line react/prop-types
const NewsTask = ({ task_id, title, date, header, description, asigned_at }) => {
  const [formatedDate, setformatedDate] = useState("");
  const [dataMembers, setDataMembers] = useState([]);
  const [open, openchange] = useState(false);
  const [open2, openchange2] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  const { isAuthenticated } = useAuthStore();
  const { changes } = useTaskStore();
  const { token } = isAuthenticated();
  const { listMembersStore } = useBoardStore();
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: task_id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
  };
 
  const functionopenpopup = () => {
    openchange(true);
  };

  const closepopup = () => {
    openchange(false);
  };

  const functionopenpopup2 = () => { 
    setDataMembers(listMembersStore);
    openchange2(true);
  };

  const closepopup2 = () => {
    openchange2(false);
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
    getComments(task_id);    
  }, [date, changes]);

  return (
    <Box style={style}  sx={globalStyles.paperNewTask} >
      <Box ref={setNodeRef} {...listeners} {...attributes} component={"div"}>
      <Box sx={header}></Box>
      <Typography variant="h6" color="#6161ff" sx={{ marginBottom: "8px" }}>
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        sx={{ marginBottom: "8px" }}
      >
        {description}
      </Typography>
      </Box>
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
          <IconButton
            sx={{ color: asigned_at ? "green" : "red" }}
            size="small"
            onClick={functionopenpopup2}
          >
            {
              asigned_at ? <SupervisorAccountIcon fontSize="small" /> : <PersonAddAltIcon fontSize="small" />
            }
          </IconButton>
          <IconButton
            sx={{ color: "#6161ff" }}
            size="small"
            onClick={functionopenpopup}
          >
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
        task_title={title} // Add task_id as a prop to the ModalComments component for identifying the task.  // Add task_id as a prop to the ModalComments component for identifying the task
      />
      <ModalAssingTask
        functionopenpopup={functionopenpopup2}
        closepopup={closepopup2}
        open={open2}
        task_id={task_id}
        dataMembers={dataMembers}
        defaultMember={asigned_at} // Add assigned_at as a prop to the ModalAssingTask component for identifying the default member.  // Add assigned_at as a prop to
      />
    </Box>
  );
};

export default NewsTask;
