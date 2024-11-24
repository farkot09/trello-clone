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
import useAuthStore from "../../store/authStore";
import { createBoard } from "../../services/boards";
import useTaskStore  from "../../store/taskStore";

const ModalNewBoard = ({ closepopup, open }) => {
    const [title, setTitle] = useState("")
    const [getToken, setGetToken] = useState("")
    const [severityAlert, setSeverityAlert] = useState("");
    const [messageAlert, setMessageAlert] = useState(""); 

    const { isAuthenticated } = useAuthStore();
    const { id, token } = isAuthenticated();
    const { setChanges } = useTaskStore();

    useEffect(() => {
        setGetToken(token)        
    }, [token])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBoard = { title, createdById:id}
        setSeverityAlert("success");
        setMessageAlert("Board added successfully");        
        try {
          const res = await createBoard(newBoard, getToken);
          console.log(res);
          setChanges(newBoard)
          
        } catch (error) {
          console.error(error);
          setSeverityAlert("error");
          setMessageAlert("Failed to add board");
          
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
          Add New Board
          <IconButton onClick={closepopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
          <Stack spacing={2} margin={2}>
            <TextField variant="outlined" label="Title" onChange={(e) => setTitle(e.target.value)}></TextField>        
            <Button  onClick={handleSubmit} variant="contained" sx={{backgroundColor:'#6161ff'}}>
              Create Board
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

export default ModalNewBoard;