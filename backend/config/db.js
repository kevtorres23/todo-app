const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected successfully to the database.`.blue);
    } catch (error) {
        console.log(`Error while connecting to the database`.red)
    }
}

module.exports = connectDB;