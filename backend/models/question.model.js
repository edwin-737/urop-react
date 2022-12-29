const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questionSchema = new Schema({
    body: {
        type: String,
        required: true
    },   //Question body
    type: {
        type: Number,
        required: true
    }, //0- sq, 1- single answer mcq,2- multiple answer mcq,3- T/F
    options: [{
        type: Schema.Types.ObjectId,
        ref: 'option',
    }],
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'chapter'
    }],
    question_id: {
        type: String,
        required: true,
    },
    schema_version: { type: Number }
});
const problem = mongoose.model('question', questionSchema);
module.exports = problem;