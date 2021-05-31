const mongoose = require("mongoose");
const {Schema,model} = mongoose
const notificationSchema = new Schema({
    notifType:{ type: String },
    notifSender:[String],//0 => ID, 1 => Name
    notifState:{ type: String },
    notifBody:[String],//0 => ID, 1 => Name
    date:{type:Date},//exact date of alert

})

module.exports = Notif = model("notif",notificationSchema); 