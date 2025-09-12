const mongoose = require('mongoose')

const collaboratorsSchema = new mongoose.Schema(
    {
        name: String,
        picture: String,
    }
)

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter a title."],
            trim: true
        },
        description: {
            type: String,
            required: [true, "Please enter a description."],
            trim: true
        },
        collaborators: {
            type: [collaboratorsSchema],
            required: false,
        }
    },
    { timestamps: true },
    { collection: 'tasks' },
);

module.exports = mongoose.model("Task", taskSchema, 'tasks');