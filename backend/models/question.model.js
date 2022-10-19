const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const problemSchema = new Schema({
    question: String,//Question body
    qnType: Number, //Whether its sq or mcq
    options: [
        { body: String }, //Question body
        {
            chosenBy: [{
                type: Schema.Types.ObjectId,
                ref: "student"
            }]
        }, //Array of student names who chose it
    ],
    studentAnswers: [{
        student: { type: Schema.Types.ObjectId, ref: "Student" },
        answer: String,
    }],
});
const problem = mongoose.model('problem', problemSchema);
module.exports = problem;