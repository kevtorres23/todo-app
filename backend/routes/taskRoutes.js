const express = require('express')
const { taskCreationController } = require('../controllers/taskCreation')
const router = express.Router()

router.post("/taskCreation", taskCreationController);

module.exports = router;