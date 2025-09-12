const collaboratorModel = require("../models/collaboratorModel");

const collaboratorCreationController = (req, res) => {
    try {
        const { name, picture } = req.body;
        if (!name || !picture ) {
            return res.status(400).send({
                success: false,
                message: "Please enter all the details of the collaborator"
            })
        }

        collaboratorModel({
            name,
            picture,
        }).save()

        return res.status(200).send({
            success: true,
            message: "Collaborator created successfully".green
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while creating the collaborator",
            error
        })
    }
}

const getAllCollaborators = async (req, res) => {
    try {
        const collaboratorData = await collaboratorModel.find();
        if (!collaboratorData || collaboratorData.length === 0) {
            return res.status(404).json({ message: "Collaborator data not found" });
        }
        res.status(200).json(collaboratorData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

const getCollaboratorById = async (req, res) => {
    try {
        const id = req.params.id;
        const collaboratorExist = await collaboratorModel.findById(id);

        if (!collaboratorExist) {
            res.status(404).json({ message: "Collaborator data not found." });
        }

        res.status(200).json(collaboratorExist);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });

    }
}

const deleteCollaborator = async (req, res) => {
    try {
        const id = req.params.id;
        const collaboratorExist = await collaboratorModel.findById(id);
        if (!collaboratorExist) {
            return res.status(404).json({ message: "Collaborator not found." });
        }
        await collaboratorModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Collaborator deleted successfylly." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}

module.exports = { collaboratorCreationController, getAllCollaborators, getCollaboratorById, deleteCollaborator };