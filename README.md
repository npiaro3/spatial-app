# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Set up ENV

Make sure you have PostgreSQL pgAdmin4 (Windows) or Postico(Mac) properly installed and set up

First rename the "dev.env" files to just ".env" in both the server and root directory, and fill in appropiate info.

Typically you will only need to specify your local postgres database password

## To Start App

1. Make sure you have the following python libraries installed and the latest version of python:

- psycopg2
- os
- dotenv

Use `pip install <library name>` to install libraries.

2. In the server directory, run:

### `npm install`

### `py create_database_script.py`

3. Then run:

### `node index.js`

4. In a seperate terminal, navigate to the root directory and run:

### `npm install`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

\*\*To Run API Tests, navigate to server directory and simply run (tests still under development):

### `npm test`
