import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Avatar, Box, IconButton } from "@mui/material";
import globalStyles from "../../styles";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const NewsTask = ({ title, comments, date, header }) => {
  const [formatedDate, setformatedDate] = useState("");
  useEffect(() => {
    const fecha = new Date(date);
    const opciones = { day: "numeric", month: "long" };
    const fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);
    setformatedDate(fechaFormateada);
  }, [date]);

  return (
    <Box sx={globalStyles.paperNewTask}>
      {/* Encabezado decorativo */}
      <Box sx={header}></Box>

      {/* Título */}
      <Typography variant="h6" color="black" sx={{ marginBottom: "8px" }}>
        {title}
      </Typography>

      {/* Información del pie de tarjeta */}
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
            sx={{ width: 30, height: 30, marginRight: "8px" }}
          />
          <Typography variant="body2" color="textSecondary">
            {formatedDate}
          </Typography>
        </Box>

        {/* Icono de comentarios */}
        <IconButton size="small">
          <ChatBubbleOutlineIcon fontSize="small" />
          <Typography variant="body2" sx={{ marginLeft: "4px" }}>
            {comments?.length}
          </Typography>
        </IconButton>
      </Box>
    </Box>
  );
};

export default NewsTask;
