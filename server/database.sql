-- Create the "spatial_db" database
CREATE DATABASE spatial_db;

-- Create the Client table
CREATE TABLE Todo (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(50),
    category VARCHAR(15),
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_complete BOOLEAN,
    completion_state VARCHAR(20)
);