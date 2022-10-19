const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const professorSchema = new Schema({
    username: String,
    courses: [{
        type: Schema.Types.ObjectId,
        ref: "course"
    }],
},
    {
        timestamps: true,
    });
const professor = mongoose.model("professor", professorSchema);
module.exports = professor;