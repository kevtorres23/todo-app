const express = require('express')
const { tagCreationController, getAllTags, deleteTag, getTagById } = require('../controllers/tagController')
const router = express.Router()

router.post("/tagCreation", tagCreationController);
router.get("/tagGet", getAllTags);
router.get("/tagGet/:id", getTagById);
router.delete("/tagDelete/:id", deleteTag);

module.exports = router;