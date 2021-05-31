const mongoose = require("mongoose")


const connectDB= async ()=>{
    try {
        await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true,  useUnifiedTopology: true , useFindAndModify: false});
        console.log("database connected !")
    } catch (error) {
        console.log("database not connected",error);
    }
    
}

module.exports = connectDB;