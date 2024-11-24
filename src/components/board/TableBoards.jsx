import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  AvatarGroup,
  Avatar,
  Button,
  LinearProgress,
  Box,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FolderIcon from "@mui/icons-material/Folder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TableBoards({ data }) {
  // Componente AvatarBox para renderizar los avatares dinámicamente
  const AvatarBox = ({ numUsers }) => {
    // Generar lista dinámica de avatares basada en numUsers
    const avatars = Array.from({ length: numUsers }, (_, index) => ({
      src: `https://avatar.iran.liara.run/public/${index + 1}`, // Puedes asignar URLs de imágenes reales si están disponibles
      fallback: `U${index + 1}`, // Texto de respaldo, como "U1", "U2", etc.
    }));

    return (
      <AvatarGroup max={4} style={{ justifyContent: "center" }}>
        {avatars.map((avatar, index) => (
          <Avatar key={index} alt={`Avatar ${index + 1}`} src={avatar.src}>
            {avatar.fallback}
          </Avatar>
        ))}
      </AvatarGroup>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Board</TableCell>
            <TableCell align="center">Users Assigned</TableCell>
            <TableCell align="right">Tasks Created</TableCell>
            <TableCell align="right"> - </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((board, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Box
                  sx={{
                    padding: "16px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    textAlign: "center",
                    backgroundColor: "#f9f9f9",
                    maxWidth: "200px", // Ajusta el ancho según lo necesites
                    margin: "auto", // Centra el box horizontalmente
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: "bold" }}
                  >
                    {board.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Created {board.createdAt.split("T")[0]}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <div
                  style={{
                    padding: "10px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <AvatarBox numUsers={board.usersAssignedIds?.length} />
                </div>
              </TableCell>
              <TableCell align="right">
                {Array.isArray(board.taskIds) ? board.taskIds.length : 0}
                <LinearProgress
                  color="success"
                  variant="buffer"
                  value={board.taskIds?.length * 10 || 0}
                />
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  startIcon={<FolderIcon />}
                  onClick={() => {
                    window.location.href = `/tasks/${board.id}`;
                  }}
                  sx={{ marginRight: "5px" }}
                >
                  View
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<EditIcon />}
                  sx={{ marginRight: "5px" }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
