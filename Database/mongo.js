const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://abhishekharkar:abhishekharkar@cluster0.tcqua6t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
