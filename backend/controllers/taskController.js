const taskModel = require("../models/taskModel");

const taskCreationController = (req, res) => {
    try {
        const { title, description, collaborators } = req.body;
        if (!title || !description || !collaborators) {
            return res.status(400).send({
                success: false,
                message: "Please enter all the details of the task"
            })
        }

        taskModel({
            title,
            description,
            collaborators
        }).save()

        return res.status(200).send({
            success: true,
            message: "Task created successfully".green
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while creating the task",
            error
        })
    }
}

const getAllTasks = async (req, res) => {
    try {
        const taskData = await taskModel.find();
        if (!taskData || taskData.length === 0) {
            return res.status(404).json({ message: "User data not found" });
        }
        res.status(200).json(taskData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

const getTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const taskExist = await taskModel.findById(id);

        if (!taskExist) {
            res.status(404).json({ message: "Task data not found." });
        }

        res.status(200).json(taskExist);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });

    }
}

const updateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const taskExist = await taskModel.findById(id);
        if (!taskExist) {
            return res.status(404).json({ message: "Task not found." });
        }
        const updatedTask = await taskModel.findByIdAndUpdate(id, req.body, {
            new: true
        })
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const taskExist = await taskModel.findById(id);
        if (!taskExist) {
            return res.status(404).json({ message: "Task not found." });
        }
        await taskModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted successfylly." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

module.exports = { taskCreationController, getAllTasks, getTaskById, updateTask, deleteTask };