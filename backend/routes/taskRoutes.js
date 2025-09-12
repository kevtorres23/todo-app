const express = require('express')
const { taskCreationController, getAllTasks, updateTask, deleteTask, getTaskById } = require('../controllers/taskController')
const router = express.Router()

router.post("/taskCreation", taskCreationController);
router.get("/taskGet", getAllTasks);
router.get("/taskGet/:id", getTaskById);
router.put("/taskUpdate/:id", updateTask);
router.delete("/taskDelete/:id", deleteTask);

module.exports = router;