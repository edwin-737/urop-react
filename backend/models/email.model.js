const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const emailSchema = new Schema({
    address: { type: String },   //retrieved by graphAPI (ideally)
},
    {
        timestamps: true,
    });
const email = mongoose.model("email", emailSchema);
module.exports = email;