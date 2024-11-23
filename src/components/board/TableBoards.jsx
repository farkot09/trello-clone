import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

export default function TableBoards({ data }) {
  useEffect(() => {
    // This will print the boards array with all the data you need.
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="right">Created</TableCell>
            <TableCell align="right">Users Assigned</TableCell>
            <TableCell align="right">Tasks Created</TableCell>
            <TableCell align="right"> - </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((board, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{board.title}</TableCell>
              <TableCell align="right">{board.createdAt}</TableCell>
              <TableCell align="right">
                {" "}
                {Array.isArray(board.usersAssignedIds)
                  ? board.usersAssignedIds.length
                  : 0}
              </TableCell>
              <TableCell align="right">
                {" "}
                {Array.isArray(board.taskIds) ? board.taskIds.length : 0}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => {
                    window.location.href = `/tasks/${board.id}`;
                  }}
                >
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
