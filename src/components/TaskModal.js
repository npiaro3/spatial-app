import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { API_ENDPOINT_PREFIX, CATEGORY } from "../helpers/constants";
import { useContext, useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomDialogTitle from "./CustomDialogTitle";
import { GlobalStateContext } from "../helpers/GlobalStateContext";

const CustomExpandMoreIcon = styled(ExpandMoreIcon)({
  color: "#2F80ED",
});

const TaskModal = ({ open, task, handleModalClose }) => {
  const [category, setCategory] = useState(CATEGORY.WEB_DESIGN);
  const [description, setDescription] = useState("");
  const { setAlertOpen, isSuccess, setIsSuccess, setRefetch } =
    useContext(GlobalStateContext);

  useEffect(() => {
    if (task) {
      const { description, category } = task;
      setCategory(category);
      setDescription(description);
    }
  }, [task, handleModalClose]);

  useEffect(() => {
    if (isSuccess !== null) {
      setAlertOpen(true);
      setDescription("");
      setCategory(CATEGORY.WEB_DESIGN);
      handleModalClose();
    }
  }, [isSuccess]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCreateEditTodo = (e) => {
    e.preventDefault();
    const createEditTodo = async () => {
      try {
        const endpoint = `${API_ENDPOINT_PREFIX}/todos${
          task ? `/${task.todo_id}` : ""
        }`;
        const requestBody = {
          description,
          category,
        };

        if (task) {
          requestBody.is_complete = task.is_complete;
          requestBody.completion_state = task.completion_state;
        }
        await fetch(endpoint, {
          method: task ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });
        setIsSuccess(true);
        setRefetch(true);
      } catch (err) {
        setIsSuccess(false);
        console.error(err.message);
      }
    };
    createEditTodo();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleModalClose}
        PaperProps={{
          component: "form",
          sx: { width: "334px", borderRadius: "8px" },
        }}
      >
        <CustomDialogTitle
          title={`${!task ? "Create New" : "Edit"} Task`}
          onClose={handleModalClose}
        />
        <DialogContent>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography sx={{ fontSize: "13px" }}>Category</Typography>
            <Box sx={{ minWidth: 120 }}>
              <Select
                value={category}
                onChange={handleCategoryChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                IconComponent={CustomExpandMoreIcon}
                sx={{
                  height: "23px",
                  borderRadius: "18px",
                  "& .MuiSelect-select": {
                    height: "23px",
                    display: "flex",
                    alignItems: "center",
                    border: "none",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "18px",
                    border: "none",
                  },
                  backgroundColor: "#2F80ED40",
                  color: "#2F80ED",
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: "18px",
                    },
                  },
                }}
              >
                {Object.keys(CATEGORY).map((category) => (
                  <MenuItem key={category} value={CATEGORY[category]}>
                    {CATEGORY[category]}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Stack>
          <TextField
            required
            id="description"
            name="description"
            value={description}
            fullWidth
            multiline
            rows={4}
            onChange={handleDescriptionChange}
            placeholder="Description..."
            InputLabelProps={{ shrink: false }}
            InputProps={{ style: { height: "121px" } }}
            inputProps={{ maxLength: 50 }}
            sx={{ mt: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleCreateEditTodo}
            sx={{ mt: 2 }}
          >{`${!task ? "Create" : "Save"} Task`}</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskModal;
