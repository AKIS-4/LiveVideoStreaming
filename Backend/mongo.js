const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/lvs";

const connectToMongo = () => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
    }); 
};

module.exports = connectToMongo; 
