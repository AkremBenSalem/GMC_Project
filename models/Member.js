const mongoose = require("mongoose");
const {Schema,model} = mongoose
const memberSchema = new Schema({
    dashid:[String],//0 => ID, 1 => title
    memberid:[String],//0 => ID, 1 => name
    role:{ type: String },
    state:{ type: String },

})

module.exports = Member = model("member",memberSchema); 