const request = require("supertest");
const express = require("express");
const app = express();
const pool = require("./db");

// Mock the database pool
jest.mock("./db");

describe("Todo API", () => {
  beforeEach(() => {
    pool.query.mockClear();
  });

  // Test GET /api/todosByState
  it("should get todos by state", async () => {
    pool.query
      .mockImplementationOnce(() => ({ rows: [] }))
      .mockImplementationOnce(() => ({ rows: [] }))
      .mockImplementationOnce(() => ({ rows: [] }))
      .mockImplementationOnce(() => ({ rows: [] }))
      .mockImplementationOnce(() => ({ rows: [] }))
      .mockImplementationOnce(() => ({ rows: [] }));

    const res = await request(app).get("/api/todosByState");
    console.log(res);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      new: [],
      in_progress: [],
      ready: [],
    });
  });

  // Test PUT /api/todos/:id
  it("should update a todo", async () => {
    const todoId = 1;
    const updatedTodo = {
      description: "Updated description",
      category: "Engineering",
      is_complete: true,
      completion_state: "in_progress",
    };

    pool.query
      .mockImplementationOnce(() => ({ rows: [{ todo_id: todoId }] }))
      .mockImplementationOnce(() => ({ rows: [updatedTodo] }));

    const res = await request(app)
      .put(`/api/todos/${todoId}`)
      .send(updatedTodo);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(updatedTodo);
  });

  // Test POST /api/todos
  it("should create a new todo", async () => {
    const newTodo = {
      description: "New todo",
      category: "Web Design",
    };
    const createdTodo = {
      ...newTodo,
      is_complete: false,
      completion_state: "new",
    };

    pool.query.mockImplementationOnce(() => ({ rows: [createdTodo] }));

    const res = await request(app).post("/api/todos").send(newTodo);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(createdTodo);
  });

  // Test DELETE /api/todos/:id
  it("should delete a todo", async () => {
    const todoId = 1;
    const todo = {
      todo_id: todoId,
      description: "Delete this",
      category: "Sales",
    };

    pool.query
      .mockImplementationOnce(() => ({ rows: [todo] }))
      .mockImplementationOnce(() => ({ rows: [] }));

    const res = await request(app).delete(`/api/todos/${todoId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(todo);
  });

  // Test DELETE /api/todos
  it("should delete all todos", async () => {
    const allTodos = [
      { todo_id: 1, description: "First todo", category: "Marketing" },
      { todo_id: 2, description: "Second todo", category: "Operations" },
    ];

    pool.query
      .mockImplementationOnce(() => ({ rows: allTodos }))
      .mockImplementationOnce(() => ({ rows: [] }));

    const res = await request(app).delete("/api/todos");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(allTodos);
  });
});
