const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema(
    {
        name: String,
        color: String,
    },
    { timestamps: true },
    { collection: 'tags' }
)

module.exports = mongoose.model("Tags", tagSchema, 'tags');