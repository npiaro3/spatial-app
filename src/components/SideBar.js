import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import CustomDialogTitle from "./CustomDialogTitle";
import { API_ENDPOINT_PREFIX } from "../helpers/constants";
import { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../helpers/GlobalStateContext";

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const { setAlertOpen, isSuccess, setIsSuccess, setRefetch } =
    useContext(GlobalStateContext);

  useEffect(() => {
    if (isSuccess !== null) {
      setAlertOpen(true);
      handleModalClose();
    }
  }, [isSuccess]);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const deleteTodos = async () => {
      try {
        await fetch(`${API_ENDPOINT_PREFIX}/todos`, {
          method: "DELETE",
        });
        setIsSuccess(true);
        setRefetch(true);
      } catch (err) {
        setIsSuccess(false);
        console.err(err);
      }
    };
    deleteTodos();
  };
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "280px",
        height: "100%",
        pl: "40px",
        borderRight: "1px solid #EFEFEF",
      }}
    >
      <Box sx={{ mt: "50px" }}>
        <Typography sx={{ fontSize: "25px", color: "#3D3D3D" }}>
          Task Manager
        </Typography>
        <Button
          variant="contained"
          startIcon={<ChecklistIcon />}
          sx={{
            backgroundColor: "#2563DC",
            width: "200px",
            height: "40px",
            mt: "74px",
            pl: "28px",
            borderRadius: "8px",
            justifyContent: "flex-start",
          }}
        >
          Tasks
        </Button>
      </Box>
      <Button
        variant="contained"
        onClick={handleModalOpen}
        sx={{
          backgroundColor: "#FDF0EC",
          color: "#81290E",
          width: "200px",
          height: "40px",
          mb: "40px",
          borderRadius: "8px",
        }}
      >
        Delete All Tasks
      </Button>
      <Dialog
        open={open}
        onClose={handleModalClose}
        PaperProps={{
          component: "form",
          sx: { width: "334px", borderRadius: "8px" },
        }}
      >
        <CustomDialogTitle title="Delete Todo" onClose={handleModalClose} />
        <DialogContent>
          <DialogContentText>
            {`Are you sure you want to delete ALL Tasks?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            color="error"
            onClick={handleDelete}
            autoFocus
            sx={{ mr: 3 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default SideBar;
