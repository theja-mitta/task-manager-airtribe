# task-manager-airtribe

# Task Manager API

This repository contains the code for a Task Manager API, which allows users to perform various operations on tasks.

## Installation

To use this API, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/task-manager.git
   ```

2. Install the dependencies:

   ```bash
   cd task-manager
   npm install
   ```

3. Set up the database:

   - Create a `tasks.json` file in the root directory with the following format:

     ```json
     {
       "tasks": []
     }
     ```

4. Start the server:

   ```bash
   npm start
   ```

   The server will start running on `http://localhost:3002`.

## API Endpoints

The following endpoints are available in the Task Manager API:

### Retrieve all tasks

- Method: GET
- URL: `/tasks`
- Query Parameters:
  - `completed` (optional): Filter tasks based on completion status (`true` or `false`).
  - `sortBy` (optional): Sort tasks by field and direction (e.g., `createdAt:desc`).

### Retrieve a single task by its ID

- Method: GET
- URL: `/tasks/:id`

### Retrieve a task by priority level

- Method: GET
- URL: `/tasks/priority/:level`

### Create a new task

- Method: POST
- URL: `/tasks`
- Request Body: JSON object containing task details (`title`, `description`, `completed`)

### Update an existing task by its ID

- Method: PUT
- URL: `/tasks/:id`
- Request Body: JSON object containing task details to update (`title`, `description`, `completed`)

### Delete a task by its ID

- Method: DELETE
- URL: `/tasks/:id`
