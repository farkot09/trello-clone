/* eslint-disable react/prop-types */
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { assingTask } from "../services/tasks";
import useAuthStore from "../store/authStore";
import useTaskStore from "../store/taskStore";

const ModalAssingTask = ({ closepopup, open, dataMembers, task_id, defaultMember }) => {
  const [member, setmember] = useState(defaultMember?.id || "");
  const [severityAlert, setAeverityAlert] = useState("");
  const [alertMessage, setalertMessage] = useState("");
  const { isAuthenticated } = useAuthStore();
  const { id, token } = isAuthenticated();
  const { setChanges } = useTaskStore();

  const handleChange = (event) => {
    setmember(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (member === "") {
      setAeverityAlert("error");
      setalertMessage("Please select a member");

      return;
    }
    
    const res = await assingTask(task_id, {id:task_id,asigned_at:member }, token);
    setChanges(task_id)    
    closepopup();
  }

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
          Assign Task
          <IconButton onClick={closepopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
          <Stack spacing={2} margin={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">member</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="member"
                value={member}
                onChange={handleChange}
              >
                {
                    dataMembers.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))
  
                }
              </Select>
              <Button onClick={handleSubmit} sx={{marginTop:3, backgroundColor: "#6161ff"}} variant="contained" color="primary">Assing</Button>
            </FormControl>
            <Alert severity={severityAlert}>{alertMessage}</Alert>
          </Stack>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalAssingTask;
