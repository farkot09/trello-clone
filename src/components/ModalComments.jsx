/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { getCommentsByTask, createComment } from "../services/comments";
import useAuthStore from "../store/authStore";
import Grid from "@mui/material/Grid2";
import { motion } from "framer-motion";

const ModalComments = ({ closepopup, open, task_id, task_title }) => {
  const [getToken, setGetToken] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const { isAuthenticated } = useAuthStore();
  const { id, token } = isAuthenticated();

  useEffect(() => {
    setGetToken(token);
    getComments(task_id);
  }, [token, comments]);

  const getComments = async () => {
    try {
      const res = await getCommentsByTask(task_id, getToken);
      setComments(res.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addComment = { content:newComment, id_user: id, id_task: task_id  };
    try {
      const res = await createComment(addComment, getToken);
      console.log(res.data);
      setNewComment("")

    } catch (error) {
        console.error(error.response.data.message);
    }
  };

  const ComentarioItem = ({ comment }) => {
    return (
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2}>
          {/* Información del usuario */}
          <Grid size={{xs:12, sm:3}}>
            <Typography variant="subtitle2">{comment.id_user.name}</Typography>
            <Typography variant="caption" color="#fc275d">
              {comment.id_user.email}
            </Typography>
          </Grid>
          {/* Contenido del comentario */}
          <Grid size={{xs:12, sm:9}} >
            <Typography variant="body1">{comment.content}</Typography>
            <Typography variant="caption" color="#01c875">
              {new Date(comment.createdAt).toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Dialog
        // fullScreen
        open={open}
        onClose={closepopup}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <IconButton onClick={closepopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>
          <Typography variant="h6" color="info">{task_title}</Typography> 
          <Typography variant="subtitle2" color="textSecondary">Comments</Typography> 
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
          <Stack spacing={1} margin={1}>
            {comments?.map((comment) => (
                <motion.div key={comment.id} initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <ComentarioItem comment={comment} />
                </motion.div>
            ))}
            <TextField
              variant="outlined"
              label="Add Comment"
              onChange={(e) => setNewComment(e.target.value)}
            ></TextField>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{ backgroundColor: "#6161ff" }}
            >
              Add Comment
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalComments;
