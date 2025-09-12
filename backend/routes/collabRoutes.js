const express = require('express')
const { collaboratorCreationController, getAllCollaborators, getCollaboratorById, deleteCollaborator } = require('../controllers/collabController')
const router = express.Router()

router.post("/collabCreation", collaboratorCreationController);
router.get("/collabGet", getAllCollaborators);
router.get("/collabGet/:id", getCollaboratorById);
router.delete("/collabDelete/:id", deleteCollaborator);

module.exports = router;