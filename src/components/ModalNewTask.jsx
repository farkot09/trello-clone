/* eslint-disable react/prop-types */
import {
    Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { createTask } from "../services/tasks";
import useAuthStore from "../store/authStore";
import useTaskStore from "../store/taskStore";
import { useParams } from "react-router-dom";

const ModalNewTask = ({ closepopup, open }) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("") 
    const [getToken, setGetToken] = useState("")
    const [severityAlert, setAeverityAlert] = useState("");
    const [messageAlert, setMessageAlert] = useState(""); 

    const { isAuthenticated } = useAuthStore();
    const { id, token } = isAuthenticated();
    const { addTask, setChanges } = useTaskStore();
    const { boardId } = useParams();

    useEffect(() => {
        setGetToken(token)        
    }, [token])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { title, description, id_user: id, status: "Pending", id_board:+boardId};
        try {
          const res = await createTask(newTask, getToken);          
          if (res.status === 201) {
            setAeverityAlert("success");
            setMessageAlert(`Task - ${title} - was created successfully!`);
            setTitle("");
            setDescription("");
            closepopup(true);
            addTask(newTask);
            setChanges(newTask)
          }

        } catch (error) {            
            setAeverityAlert("error");
            setMessageAlert(error.response.data.message);
            setTitle("");
            setDescription("");
        }
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
          Add New Task
          <IconButton onClick={closepopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
          <Stack spacing={2} margin={2}>
            <TextField variant="outlined" label="Title" onChange={(e) => setTitle(e.target.value)}></TextField>
            <TextField variant="outlined" label="Description" onChange={(e) => setDescription(e.target.value)}></TextField>
            <Button  onClick={handleSubmit} variant="contained" sx={{backgroundColor:'#6161ff'}}>
              Create
            </Button>
            <Alert severity={severityAlert}>{messageAlert}</Alert>
          </Stack>
        </DialogContent>
        <DialogActions>        
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalNewTask;
