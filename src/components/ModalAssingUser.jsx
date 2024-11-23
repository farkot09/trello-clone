/* eslint-disable react-hooks/exhaustive-deps */
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
    Typography,
  } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
  
  const ModalAssingUser = ({ closepopup, open, setEmail, handleAsssingUser, severityAlert, messageAlert }) => {  

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
            <Typography variant="h6" color="info">
            Assign users to this Board
            </Typography>
          </DialogTitle>
          <DialogContent>
            {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
            <Stack spacing={1} margin={1}>
             
              <TextField
                variant="outlined"
                label="Email"
                onChange={(e) => setEmail(e.target.value)}           
              ></TextField>
              <Button      
                variant="contained"
                sx={{ backgroundColor: "#6161ff" }}
                onClick={handleAsssingUser}
              >
                Find user
              </Button>
              <Alert severity={severityAlert}>{messageAlert}</Alert>
            </Stack>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </div>
    );
  };
  
  export default ModalAssingUser;