const mongoose = require('mongoose')

const collaboratorsSchema = new mongoose.Schema(
    {
        name: String,
        image: String,
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
    { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);