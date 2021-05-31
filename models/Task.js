const mongoose = require("mongoose");
const {Schema,model} = mongoose
const taskSchema = new Schema({
    dashid:[String],//0 => ; 1 => title
    description:{ type: String, required:true},
    managerid:[String],//0 => ; 1 => name
    workerid:[String],//0 => ; 1 => name
    deadLine:{type:Date, required:true},
    state:{ type: String, required:true },
})

module.exports = Task = model("task",taskSchema); 