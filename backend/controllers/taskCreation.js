const taskModel = require("../models/taskModel");

const taskCreationController = (req, res) => {
    try {
        const { title, description, collaborators } = req.body;
        if ( !title || !description || !collaborators ) {
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

module.exports = { taskCreationController };