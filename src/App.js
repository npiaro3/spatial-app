import { Stack, ThemeProvider, createTheme } from "@mui/material";
import { SideBar, Tasks, TopBar } from "./components";
import { GlobalStateProvider } from "./helpers/GlobalStateContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./index.css";

function App() {
  const theme = createTheme({
    typography: {
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStateProvider>
        <DndProvider backend={HTML5Backend}>
          <div className="app">
            <SideBar />
            <Stack sx={{ width: "calc(100% - 280px)" }}>
              <TopBar />
              <Tasks />
            </Stack>
          </div>
        </DndProvider>
      </GlobalStateProvider>
    </ThemeProvider>
  );
}

export default App;
