/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import ButtonNewBoard from "../components/board/ButtonNewBoard";
import { Typography } from "@mui/material";
import { getBoardsByUserId} from "../services/boards";
import useAuthStore from "../store/authStore";
import useBoardStore from "../store/boardStore";
import TableBoards from "../components/board/TableBoards";
import { useLocation } from 'react-router-dom';


const BoardPage = () => {
  const { isAuthenticated } = useAuthStore();
  const { id, token } = isAuthenticated();
  const { setBoards, boards } = useBoardStore();

  useEffect(() => {
    getBoardsByUserId(id, token).then((response) => {
      setBoards(response.data);
    });    
  }, [id, token]);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginLeft: "10px",
        marginRight: "10px",
      }}
    >
      {/* Reder Tareas Pendientes */}
      <Grid size={{ md: 8, xs: 12 }}>
        <Typography
          variant="h5"
          color="textSecondary"
          sx={{ textAlign: "center" }}
        >
          New Board
          <ButtonNewBoard />
        </Typography>
        <TableBoards data={boards} />

      </Grid>

    </Grid>
  );
};

export default BoardPage;