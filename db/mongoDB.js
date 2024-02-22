const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = ()=> {
    try {
        mongoose.connect(`${process.env.MONGO_URL}`);
        console.log("connected to DB successfully");
    } catch(err) {
        console.log(err);
    }
}

module.exports = connectDB;