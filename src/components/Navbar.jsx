// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Avatar, Box, Button, InputBase, Stack, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { deepOrange } from "@mui/material/colors";
import useAuthStore from "../store/authStore";
import { Link } from "react-router-dom";
import { getUserByEmail, getUserById } from "../services/users";
import ModalAssingUser from "./ModalAssingUser";
import { assingUserToBoard, getBoardById } from "../services/boards";
import { useLocation } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import useBoardStore from "../store/boardStore";


const Navbar = () => {
  const { isAuthenticated } = useAuthStore();
  const { setListMembersStore, listMembersStore } = useBoardStore();
  const { name, token } = isAuthenticated();
  const [open, openchange] = useState(false);
  const [email, setEmail] = useState("");
  const [severityAlert, setSeverityAlert] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const [listMembers, setListMembers] = useState([]);
  const location = useLocation();
  const match = location.pathname.match(/\/tasks\/(\d+)/);
  const boardId = match ? match[1] : null;

  const handleAsssingUser = async () => {
    try {
      const res = await getUserByEmail(email, token);      
      if(res.data === '') {
        setSeverityAlert("error");
        setMessageAlert("Email not found.");
        return;
      }
      await assingUserToBoard(boardId, {usersAssignedIds:[res.data.id]}, token);
      //reload page
      window.location.reload();
      openchange(false);
    } catch (error) {
      setSeverityAlert("error");
      setMessageAlert(error.response.data.message);
    }
  };

  const closepopup = () => {
    openchange(false);
  };

const getUsersAssignedToBoard = async () => {
  const { setListMembersStore } = useBoardStore.getState();

  setListMembers([]); // Resetea la lista local
  try {
    const boardRes = await getBoardById(boardId, token);
    await Promise.all(
      boardRes.data.usersAssignedIds.map(async (item) => {
        const userRes = await getUserById(item, token);

        // Actualiza la lista local
        setListMembers((prev) => {
          const exists = prev.some((member) => member.id === userRes.data.id);
          const updatedList = exists ? prev : [...prev, userRes.data];

          // También actualiza la lista en Zustand
          updatedList.forEach((member) => setListMembersStore(member));

          return updatedList;
        });
      })
    );
  } catch (error) {
    console.error(error);
  }
};


  useEffect(() => {
    getUsersAssignedToBoard();
  }, []);

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
      <ModalAssingUser
        closepopup={closepopup}
        open={open}
        setEmail={setEmail}
        handleAsssingUser={handleAsssingUser}
        severityAlert={severityAlert}
        messageAlert={messageAlert}
      />
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
                component={Link}
                to={`/${item.toLowerCase()}`}
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
            {listMembers.map((item, index) => (
              <Tooltip key={index} title={item.name}>
              <Avatar  sx={{ bgcolor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }}>
                {item.name.charAt(0).toUpperCase()}
              </Avatar>
              </Tooltip>
            ))}
            <IconButton
              onClick={() => openchange(true)}
              sx={{ marginRight: 1 }}
            >
              <AddIcon sx={{ color: "black" }} />
            </IconButton>
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
            <Typography variant="body2">{name}</Typography>
          </IconButton>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>
            {name.charAt(0).toUpperCase()}
          </Avatar>
          <IconButton sx={{ marginRight: 1 }} onClick={() => {
            window.location.href = "/logout";
          }}>
          <LogoutIcon sx={{ marginRight: 1, color: "red" }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
