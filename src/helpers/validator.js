class validator {
    static validateTaskInfo(taskInfo, taskData) {
        if (taskInfo.hasOwnProperty("id") &&
        taskInfo.hasOwnProperty("title") &&
        taskInfo.hasOwnProperty("description") &&
        taskInfo.hasOwnProperty("completed") && 
        taskInfo.hasOwnProperty("priority") && 
        this.validateTaskInfoValues(taskInfo) && 
        this.validatePriorityField(taskInfo) &&
        this.validateUniqueTaskId(taskInfo, taskData)) {
            return {
                "status": true,
                "message": "Task has been added"
            };
        }
        if (!this.validatePriorityField(taskInfo)) {
            return {
                "status": false,
                "message": "Task priority can be low, medium or high but not anything else"
            };
        }
        if (!this.validateUniqueTaskId(taskInfo, taskData)) {
            return {
                "status": false,
                "message": "Task id should be unique"
            };
        }
        if (!this.validateTaskInfoValues(taskInfo, taskData)) {
            return {
                "status": false,
                "message": "Please pass valid data type values"
            };
        }
        return {
            "status": false,
            "message": "Task info provided is malformed, please provide all require fields"
        };
    }

    static validatePriorityField(taskInfo) {
        const allowedPriorities = ["low", "medium", "high"];
        return allowedPriorities.includes(taskInfo['priority']);
    }

    static validateTaskInfoValues(taskInfo) {
        if (taskInfo.title != '' && 
        taskInfo.description != '' && 
        taskInfo.priority != '' &&
        typeof taskInfo.completed === 'boolean') {
            return true;
        }
        return false;
    }

    static validateUniqueTaskId(taskInfo, taskData) {
        let valueFound = taskData.tasks.some(task => task.id === taskInfo.id);
        if (valueFound) return false;
        return true;
    }
}

module.exports = validator;