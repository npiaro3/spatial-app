import { Alert, Box, Button, Snackbar, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskContainer from "./TaskContainer";
import { memo, useContext, useEffect, useMemo, useState } from "react";
import TaskModal from "./TaskModal";
import { GlobalStateContext } from "../helpers/GlobalStateContext";
import { API_ENDPOINT_PREFIX } from "../helpers/constants";

const Tasks = memo(() => {
  const [open, setOpen] = useState(false);
  const {
    alertOpen,
    isSuccess,
    setIsSuccess,
    refetch,
    setRefetch,
    filteredTodos,
    setFilteredTodos,
    setAllTodos,
    setFilterValue,
  } = useContext(GlobalStateContext);

  const newTodos = useMemo(
    () => (Object.keys(filteredTodos).length > 0 ? filteredTodos.new : []),
    [filteredTodos]
  );
  const inProgressTodos = useMemo(
    () =>
      Object.keys(filteredTodos).length > 0 ? filteredTodos.in_progress : [],
    [filteredTodos]
  );
  const readyTodos = useMemo(
    () => (Object.keys(filteredTodos).length > 0 ? filteredTodos.ready : []),
    [filteredTodos]
  );

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT_PREFIX}/todosByState`, {
          method: "GET",
        });
        const todos = await response.json();
        setAllTodos(todos);
        setFilteredTodos(todos);
        setFilterValue("");
        setRefetch(false);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchTodos();
  }, [refetch]);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        height: "100%",
        pl: "64px",
        pr: "64px",
        pb: 3,
      }}
    >
      <Stack
        direction="row"
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "31px", color: "#3D3D3D" }}>
          Tasks
        </Typography>

        <Button
          variant="contained"
          endIcon={<AddIcon />}
          onClick={handleModalOpen}
          sx={{
            backgroundColor: "#2563DC",
            width: "172px",
            height: "48px",
            pl: "32px",
            borderRadius: "8px",
            justifyContent: "flex-start",
          }}
        >
          New task
        </Button>
        <TaskModal open={open} handleModalClose={handleModalClose} />
      </Stack>

      <Stack
        direction="row"
        sx={{
          mt: 4,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TaskContainer
          color="#EAEAEA"
          label="To do"
          tasks={newTodos}
          state="new"
        />
        <TaskContainer
          color="#FFF6EB"
          label="In progress"
          tasks={inProgressTodos}
          state="in_progress"
        />
        <TaskContainer
          color="#21965326"
          label="Ready for Review"
          tasks={readyTodos}
          state="ready"
        />
      </Stack>
      {isSuccess !== null && (
        <Snackbar
          open={alertOpen}
          autoHideDuration={5000}
          onClose={() => {
            setIsSuccess(null);
          }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={isSuccess ? "success" : "error"}>
            {isSuccess ? "Success!" : "Failed!"}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
});

export default Tasks;
