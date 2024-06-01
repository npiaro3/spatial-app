import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import SpatialLogo from "../assets/spatial-logo.png";
import { Search } from "@mui/icons-material";
import { useContext } from "react";
import { GlobalStateContext } from "../helpers/GlobalStateContext";

const TopBar = () => {
  const { allTodos, setFilteredTodos, filterValue, setFilterValue } =
    useContext(GlobalStateContext);

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    if (Object.keys(allTodos).length > 0) {
      const loweredFilter = event.target.value.toLowerCase();
      const newFilteredTodos = allTodos.new.filter(
        ({ category, description }) =>
          category.toLowerCase().includes(loweredFilter) ||
          description.toLowerCase().includes(loweredFilter)
      );
      const inProgressFilteredTodos = allTodos.in_progress.filter(
        ({ category, description }) =>
          category.toLowerCase().includes(loweredFilter) ||
          description.toLowerCase().includes(loweredFilter)
      );
      const readyFilteredTodos = allTodos.ready.filter(
        ({ category, description }) =>
          category.toLowerCase().includes(loweredFilter) ||
          description.toLowerCase().includes(loweredFilter)
      );
      setFilteredTodos({
        new: [...newFilteredTodos],
        in_progress: [...inProgressFilteredTodos],
        ready: [...readyFilteredTodos],
      });
    }
  };

  return (
    <Box
      sx={{
        height: "98px",
        borderBottom: "1px solid #EFEFEF",
        pl: "64px",
        pr: "64px",
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          mt: "22px",
          width: "100%",
        }}
      >
        <FormControl variant="outlined" sx={{ height: "48px", width: "85%" }}>
          <InputLabel htmlFor="filter-input">Filter Tasks</InputLabel>
          <OutlinedInput
            id="filter-input"
            label="Filter Tasks"
            value={filterValue}
            onChange={handleFilterChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end">
                  <Search />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Avatar
          alt="Spatial Logo"
          src={SpatialLogo}
          sx={{ width: 44, height: 44 }}
        />
      </Stack>
    </Box>
  );
};

export default TopBar;
