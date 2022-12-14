const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const optionSchema = new Schema({
    body: { type: String, required: true },             //what is the option
    chosenBy: { type: Number, required: true, default: 0 },
    isAnswer: { type: Boolean, required: true },        //Boolean indicating whether this option is the answer to the question
    question_id: { type: String, required: true },
    schema_version: { type: Number },
});
const option = mongoose.model("option", optionSchema);
module.exports = option;