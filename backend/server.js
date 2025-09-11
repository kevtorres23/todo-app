const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const connectDB = require('./config/db')

dotenv.config();

connectDB();

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get("", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the backend of TodoApp!"
    });
});

app.use("/api/task", require("./routes/taskRoutes"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`.green);
});