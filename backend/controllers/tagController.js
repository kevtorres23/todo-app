const tagModel = require("../models/tagModel");

const tagCreationController = (req, res) => {
    try {
        const { name, color } = req.body;
        if (!name || !color ) {
            return res.status(400).send({
                success: false,
                message: "Please enter all the details of the tag"
            })
        }

        tagModel({
            name,
            color,
        }).save()

        return res.status(200).send({
            success: true,
            message: "Tag created successfully".green
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while creating the tag",
            error
        })
    }
}

const getAllTags = async (req, res) => {
    try {
        const tagData = await tagModel.find();
        if (!tagData || tagData.length === 0) {
            return res.status(404).json({ message: "Tag data not found" });
        }
        res.status(200).json(tagData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

const getTagById = async (req, res) => {
    try {
        const id = req.params.id;
        const tagExist = await tagModel.findById(id);

        if (!tagExist) {
            res.status(404).json({ message: "Tag data not found." });
        }

        res.status(200).json(tagExist);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });

    }
}

const deleteTag = async (req, res) => {
    try {
        const id = req.params.id;
        const tagExist = await tagModel.findById(id);
        if (!tagExist) {
            return res.status(404).json({ message: "Tag not found." });
        }
        await tagModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Tag deleted successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

module.exports = { tagCreationController, getAllTags, getTagById, deleteTag };