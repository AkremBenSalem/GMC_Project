const mongoose = require("mongoose");
const {Schema,model} = mongoose
const dashboardSchema = new Schema({
    title:{type : String, required:true},
    creator:{type : String, required:true},
    members:[String]
})

module.exports = Dashboard = model("dashboard",dashboardSchema); 