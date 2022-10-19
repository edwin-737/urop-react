const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const studentSchema = new Schema({
    username: { type: String, required: true },
    participation: Number,
});
const student = mongoose.model('student', studentSchema);
module.exports = student;