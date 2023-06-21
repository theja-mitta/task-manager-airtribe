const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const validator = require('../helpers/validator');

const taskRoutes = express.Router();
const taskData = require('../tasks.json');

taskRoutes.use(bodyParser.urlencoded({ extended: false }));
taskRoutes.use(bodyParser.json());

const writePath = path.join(__dirname, '..', 'tasks.json');

// Retrieve all tasks
// GET /tasks
// GET /tasks?sortBy=createdAt:desc
taskRoutes.get('/', (req, res) => {
    const { completed, sortBy } = req.query;
    // Filtering of tasks based on completion status
    const filteredTasks = taskData.tasks.filter(task => {
      if (completed === 'true') {
        return task.completed === true;
      } else if (completed === 'false') {
        return task.completed === false;
      } else {
        // If the 'completed' query parameter is not provided or has an invalid value,
        // return all tasks
        return true;
      }
    });

    // Sorting of tasks by creation date
    let sortedTasks = filteredTasks;
    if (sortBy) {
        const [field, direction] = sortBy.split(':');
        if (field === 'createdAt') {
            sortedTasks = sortedTasks.sort((taskA, taskB) => {
                const dateA = new Date(taskA.createdAt);
                const dateB = new Date(taskB.createdAt);
                return direction === 'desc' ? dateB - dateA : dateA - dateB;
            });
        }
    }

    res.json(sortedTasks);
  });
  
// GET /tasks/:id - Retrieve a single task by its ID
taskRoutes.get('/:id', (req, res) => {
    const taskIdPassed = req.params.id;
    const task = taskData.tasks.find(task => task.id == taskIdPassed);
  
    if (task) {
        res.status(200).send(task);
    } else {
        res.status(404).send("Task not found with id " + taskIdPassed);
    }
});

// GET /tasks/priority/:level
taskRoutes.get('/priority/:level', (req, res) => {
    const taskPriorityLevelPassed = req.params.level;
    const task = taskData.tasks.find(task => task.priority == taskPriorityLevelPassed);

    if (task) {
        res.status(200).send(task);
    } else {
        res.status(404).send("Task not found with priority level  " + taskPriorityLevelPassed);
    }
});

// POST /tasks: Create a new task
taskRoutes.post('/', (req, res) => {
    const taskDetails = {...req.body, createdAt: new Date()};
    const validationResult = validator.validateTaskInfo(taskDetails, taskData);

    if (validationResult.status) {
        taskData.tasks.push(taskDetails);
        fs.writeFileSync(writePath, JSON.stringify(taskData), { encoding: 'utf-8', flag: 'w' });
        res.status(201).send("Task has been added successfully"); 
    } else {
        res.status(400).json(validationResult);
    }
});

// PUT /tasks/:id: Update an existing task by its ID
taskRoutes.put('/:id', (req, res) => {
    const taskIdToUpdate = req.params.id;
    const taskDetails = req.body;
    const updates = Object.keys(taskDetails);
    const allowedUpdates = ["title", "description", "completed"];
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
    const validationResult = validator.validateTaskInfoValues(taskDetails);
  
    if (isValidUpdate && validationResult) {
      const taskToUpdate = taskData.tasks.find(task => task.id == taskIdToUpdate);
      if (taskToUpdate) {
        updates.forEach(update => {
          taskToUpdate[update] = taskDetails[update];
        });
  
        fs.writeFileSync(writePath, JSON.stringify(taskData), { encoding: 'utf-8', flag: 'w' });
        res.status(201).send("Task has been updated successfully");
      } else {
        res.status(404).json({ "message": "Task not found" });
      }
    } else {
      res.status(400).json({ "message": "Invalid updates!" });
    }
  });

// DELETE /tasks/:id: Delete a task by its ID
taskRoutes.delete('/:id', (req, res) => {
    const taskIdToDelete = req.params.id;
    const taskIndex = taskData.tasks.findIndex(task => task.id == taskIdToDelete);
  
    if (taskIndex !== -1) {
      taskData.tasks.splice(taskIndex, 1);
      fs.writeFileSync(writePath, JSON.stringify(taskData), { encoding: 'utf-8', flag: 'w' });
      res.send('Task has been deleted successfully');
    } else {
      res.status(404).send('No task found with the provided ID');
    }
  });

module.exports = taskRoutes;