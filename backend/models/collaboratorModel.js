const mongoose = require('mongoose')

const collabSchema = new mongoose.Schema(
    {
        name: String,
        picture: String,
    },
    { timestamps: true },
    { collection: 'collaborators' }
)

module.exports = mongoose.model("Collaborator", collabSchema, 'collaborators');