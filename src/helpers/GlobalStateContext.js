import { createContext, useState } from "react";

export const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [refetch, setRefetch] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [allTodos, setAllTodos] = useState({});
  const [filteredTodos, setFilteredTodos] = useState({});
  const [filterValue, setFilterValue] = useState("");

  return (
    <GlobalStateContext.Provider
      value={{
        alertOpen,
        setAlertOpen,
        isSuccess,
        setIsSuccess,
        refetch,
        setRefetch,
        allTodos,
        setAllTodos,
        filteredTodos,
        setFilteredTodos,
        filterValue,
        setFilterValue,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
