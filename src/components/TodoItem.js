import {
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SpatialLogo from "../assets/spatial-logo.png";
import dayjs from "dayjs";
import CustomDialogTitle from "./CustomDialogTitle";
import { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../helpers/GlobalStateContext";
import { API_ENDPOINT_PREFIX, ItemTypes } from "../helpers/constants";
import TaskModal from "./TaskModal";
import { useDrag } from "react-dnd";

const TodoItem = ({ task }) => {
  const {
    todo_id: id,
    description,
    category,
    is_complete: isComplete,
    completion_state: completionState,
    creation_date: creationDate,
  } = task;
  const [open, setOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { setAlertOpen, isSuccess, setIsSuccess, setRefetch } =
    useContext(GlobalStateContext);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TODO,
    item: { id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        // insert edit completeion_state logic here
        changeCompletionState(dropResult.location);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const opacity = isDragging ? 0.4 : 1;

  useEffect(() => {
    if (isSuccess !== null) {
      setAlertOpen(true);
      handleModalClose();
    }
  }, [isSuccess]);

  const handleEditModalOpen = () => {
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const deleteTodo = async () => {
      try {
        await fetch(`${API_ENDPOINT_PREFIX}/todos/${id}`, {
          method: "DELETE",
        });
        setIsSuccess(true);
        setRefetch(true);
      } catch (err) {
        setIsSuccess(false);
        console.err(err);
      }
    };
    deleteTodo();
  };

  const toggleIsComplete = () => {
    const toggleTodo = async () => {
      try {
        await fetch(`${API_ENDPOINT_PREFIX}/todos/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description,
            category,
            is_complete: !isComplete,
            completion_state: completionState,
          }),
        });
        setIsSuccess(true);
        setRefetch(true);
      } catch (err) {
        setIsSuccess(false);
        console.error(err.message);
      }
    };
    toggleTodo();
  };

  const changeCompletionState = (newState) => {
    const changeState = async () => {
      try {
        await fetch(`${API_ENDPOINT_PREFIX}/todos/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description,
            category,
            is_complete: isComplete,
            completion_state: newState,
          }),
        });
        setIsSuccess(true);
        setRefetch(true);
      } catch (err) {
        setIsSuccess(false);
        console.error(err.message);
      }
    };
    if (newState !== completionState) changeState();
  };

  return (
    <>
      <Stack
        ref={drag}
        data-testid={`todo-${id}`}
        sx={{
          justifyContent: "space-around",
          mb: 2,
          height: "121px",
          borderRadius: "8px",
          p: "10px",
          gap: "10px",
          backgroundColor: "white",
          opacity,
          cursor: "move",
        }}
      >
        <Stack
          direction="row"
          sx={{
            ml: 1,
            mr: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <IconButton onClick={toggleIsComplete} sx={{ mr: 1 }}>
              {isComplete ? (
                <CheckCircleIcon color="success" />
              ) : (
                <CheckCircleOutlineIcon sx={{ color: "#828282" }} />
              )}
            </IconButton>

            <Typography
              onClick={handleEditModalOpen}
              sx={{
                textDecoration: isComplete ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {description}
            </Typography>
            <TaskModal
              open={editModalOpen}
              handleModalClose={handleEditModalClose}
              task={task}
            />
          </Stack>
          <IconButton onClick={handleModalOpen} sx={{ color: "#828282" }}>
            <DeleteOutlineIcon />
          </IconButton>
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
                {`Are you sure you want to delete the "${description}" Task?`}
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
        <Stack
          direction="row"
          sx={{ ml: 1, mr: 1, justifyContent: "space-between" }}
        >
          <Stack direction="row">
            <Avatar
              alt="Spatial Logo"
              src={SpatialLogo}
              sx={{ width: 24, height: 24, ml: 1, mr: 1 }}
            />
            <Typography>{dayjs(creationDate).format("MMM D")}</Typography>
          </Stack>
          <Chip
            label={category}
            sx={{
              backgroundColor: "#2F80ED40",
              color: "#2F80ED",
              fontWeight: "bold",
            }}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default TodoItem;
