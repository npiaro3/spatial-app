//@depreciated
import { API_ENDPOINT_PREFIX } from "./constants";

export const fetchTodos = async () => {
  try {
    const response = await fetch(`${API_ENDPOINT_PREFIX}/todosByState`, {
      method: "GET",
    });
    const allTodos = await response.json();
    return allTodos;
  } catch (err) {
    console.error(err.message);
  }
};

export const updateTodo = async ({
  id,
  description,
  category,
  isComplete,
  completionState,
}) => {
  try {
    const response = await fetch(`${API_ENDPOINT_PREFIX}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
        category,
        is_complete: isComplete,
        completion_state: completionState,
      }),
    });
    const todoData = await response.json();
    return todoData;
  } catch (err) {
    console.error(err.message);
  }
};

export const createTodo = async ({ description, category }) => {
  try {
    const response = await fetch(`${API_ENDPOINT_PREFIX}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
        category,
      }),
    });
    const newTodo = await response.json();
    return newTodo;
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteTodo = async ({ id }) => {
  try {
    const response = await fetch(`${API_ENDPOINT_PREFIX}/todos/${id}`, {
      method: "DELETE",
    });
    const deletedTodo = await response.json();
    return deletedTodo;
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteAllTodos = async () => {
  try {
    const response = await fetch(`${API_ENDPOINT_PREFIX}/todos`, {
      method: "DELETE",
    });
    const deletedTodos = await response.json();
    return deletedTodos;
  } catch (err) {
    console.error(err.message);
  }
};
