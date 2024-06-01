const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

app.get("/api/todosByState", async (req, res) => {
  try {
    const newTodosNotComplete = await pool.query(
      "SELECT * FROM Todo WHERE completion_state = 'new' and is_complete = false ORDER BY creation_date ASC"
    );
    const newTodosComplete = await pool.query(
      "SELECT * FROM Todo WHERE completion_state = 'new' and is_complete = true ORDER BY creation_date ASC"
    );
    const inProgressTodosNotComplete = await pool.query(
      "SELECT * FROM Todo WHERE completion_state = 'in_progress' and is_complete = false ORDER BY creation_date ASC"
    );
    const inProgressTodosComplete = await pool.query(
      "SELECT * FROM Todo WHERE completion_state = 'in_progress' and is_complete = true ORDER BY creation_date ASC"
    );
    const readyTodosNotComplete = await pool.query(
      "SELECT * FROM Todo WHERE completion_state = 'ready' and is_complete = false ORDER BY creation_date ASC"
    );
    const readyTodosComplete = await pool.query(
      "SELECT * FROM Todo WHERE completion_state = 'ready' and is_complete = true ORDER BY creation_date ASC"
    );
    res.json({
      new: [...newTodosNotComplete.rows, ...newTodosComplete.rows],
      in_progress: [
        ...inProgressTodosNotComplete.rows,
        ...inProgressTodosComplete.rows,
      ],
      ready: [...readyTodosNotComplete.rows, ...readyTodosComplete.rows],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE todo
app.put("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    const todo = result.rows[0];

    if (!todo) {
      return res.status(404).json({ error: "Todo with that id not found" });
    }

    const { description, category, is_complete, completion_state } = req.body;
    const updatedTodo = await pool.query(
      "UPDATE Todo SET description = $1, category = $2, is_complete = $3, completion_state = $4 WHERE todo_id = $5",
      [description, category, is_complete, completion_state, id]
    );
    res.json(updatedTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST todo
app.post("/api/todos", async (req, res) => {
  try {
    const { description, category } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO Todo (description, category, is_complete, completion_state) VALUES ($1, $2, false, 'new') RETURNING *",
      [description, category]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE todo
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    const todo = result.rows[0];

    if (!todo) {
      return res.status(404).json({ error: "Todo with that id not found" });
    }

    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/todos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Todo");
    const allTodos = result.rows;

    if (allTodos.length === 0) {
      return res.status(404).json({ error: "There are no todos to delete" });
    }

    await pool.query("DELETE FROM Todo");
    res.json(allTodos);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {});
