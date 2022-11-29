const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const problemSchema = new Schema({
    body: { type: String, required: true },   //Question body
    type: { type: Number, required: true }, //Whether its sq, single answer mcq, or multiple answer mcq
    options: [{
        type: Schema.Types.ObjectId, ref: 'option',
    }],
});
const problem = mongoose.model('problem', problemSchema);
module.exports = problem;