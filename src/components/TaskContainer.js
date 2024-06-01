import { Box, Typography } from "@mui/material";
import TodoItem from "./TodoItem";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../helpers/constants";

const TaskContainer = ({ tasks, color, label, state }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TODO,
    drop: () => ({ location: state }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  return (
    <Box
      ref={drop}
      data-testid={state}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: "12px",
        borderRadius: "12px",
        height: "650px",
        width: "328px",
        backgroundColor: color,
        overflowY: "hidden",
      }}
    >
      <Typography sx={{ mb: 1, fontSize: "16px" }}>{label}</Typography>
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "scroll",
          msOverflowStyle: "none", // Hide scrollbar in IE and Edge
          scrollbarWidth: "none", // Hide scrollbar in Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar in Chrome, Safari, and Opera
          },
        }}
      >
        {tasks.map((task, index) => (
          <TodoItem key={index} task={task} />
        ))}
      </Box>
    </Box>
  );
};

export default TaskContainer;
