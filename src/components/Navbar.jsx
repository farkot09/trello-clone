// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Avatar, Box, Button, InputBase, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { deepOrange } from "@mui/material/colors";
import useAuthStore from "../store/authStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated } = useAuthStore();
  const { name } = isAuthenticated();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        color: "black",
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", paddingX: 2 }}>
        {/* Sección izquierda: Título y navegación */}
        <Box display="flex" alignItems="center">
          {/* Icono y Título */}
          <Avatar sx={{ backgroundColor: "#8e44ad", marginRight: 1 }}>
            TC
          </Avatar>
          <Typography variant="h6" fontWeight="bold">
            Trello Clone
          </Typography>

          {/* Navegación */}
          <Stack direction="row" spacing={2} sx={{ marginLeft: 4 }}>
            {["Board", "Profile", "Calendar", "Progress"].map((item, index) => (
              <Button
                key={index}
                variant={item === "Board" ? "outlined" : "text"}
                component={Link} to={`/${item.toLowerCase()}`}
                sx={{
                  textTransform: "none",
                  fontWeight: item === "Board" ? "bold" : "normal",
                  color: item === "Board" ? "#1976d2" : "black",
                  borderColor: item === "Board" ? "#1976d2" : "transparent",
                }}
              >
                {item}
              </Button>
            ))}
          </Stack>
        </Box>

        {/* Sección derecha: Avatares, búsqueda y botones */}
        <Box display="flex" alignItems="center">
          {/* Avatares */}
          <Stack direction="row" spacing={-1} sx={{ marginRight: 2 }}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Avatar
                key={index}
                src={`https://via.placeholder.com/40?text=U${index + 1}`}
                alt={`User ${index + 1}`}
                sx={{ border: "2px solid white" }}
              />
            ))}
          </Stack>

          {/* Barra de búsqueda */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
              borderRadius: "20px",
              paddingX: 2,
              paddingY: 0.5,
              marginRight: 2,
              width: 200,
            }}
          >
            <SearchIcon sx={{ marginRight: 1, color: "gray" }} />
            <InputBase placeholder="Search" fullWidth />
          </Box>

          {/* Botones de acción */}
          <IconButton sx={{ marginRight: 1 }}>
            <AddIcon sx={{ color: "black" }} />
          </IconButton>
          <IconButton sx={{ marginRight: 1 }}>
            <Typography variant="body2">{name}</Typography>
          </IconButton>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>
            {name.charAt(0).toUpperCase()}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
