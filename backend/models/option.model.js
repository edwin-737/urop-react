const mongoose = require("mongoose");
// const { question } = require("readline-sync");
const Schema = mongoose.Schema;
const optionSchema = new Schema({
    body: String,
    chosenBy: [{
        student: {
            type: Schema.Types.ObjectId,
            ref: "student",
        }
    }],
});
const option = mongoose.model("option", optionSchema);
module.exports = option;