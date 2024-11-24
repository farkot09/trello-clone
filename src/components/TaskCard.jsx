import React from "react";
import { Card, CardContent, Typography, Chip } from "@mui/material";

export default function TaskCard({ title, status }) {
  // Determinar el color del chip según el estado
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "InProgress":
        return "warning";
      case "Pending":
        return "default";
      default:
        return "primary";
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 300,
        margin: "10px",
        boxShadow: 2,
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" noWrap>
          {title}
        </Typography>
        <Chip
          label={status}
          color={getStatusColor(status)}
          size="small"
          sx={{ marginTop: "10px" }}
        />
      </CardContent>
    </Card>
  );
}
