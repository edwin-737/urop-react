const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const courseSchema = new Schema({
    name: String,
    professors: [{ type: Schema.Types.ObjectId, ref: "professor" }],
    students: [{ type: Schema.Types.ObjectId, ref: "student" }],
    problems: [{ type: Schema.Types.ObjectId, ref: "problem" }],
});
const course = mongoose.model("course", courseSchema);
module.exports = course;