const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = ()=> {
    try {
        mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@firstcluster.plwtcni.mongodb.net/ecom?retryWrites=true&w=majority`);
        console.log("connected to DB successfully");
    } catch(err) {
        console.log(err);
    }
}

module.exports = connectDB;