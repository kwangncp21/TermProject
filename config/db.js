const mongoose = require('mongoose');
// const MONGO_URI = require('./config.env');


const connectDB = async()=>{
    // mongoose.set('strictQuery',true);
    const conn= await mongoose.connect(process.env.MONGO_URI,{
        // userNewUrlParser: true,
        // useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
}

module.exports=connectDB;