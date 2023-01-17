const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: { type: String, required: true },                             //user's legal name
    participation: { type: Number, default: 0 },                         //fill if its a student user
    index: { type: Number, required: true },
    email: { type: String, required: true },
    type: { type: Number, defualt: 0 },                 //0 for student, 1 for TA, 2 for professor
    enrollmentPeriod: { type: String, required: true },
    graph_id: { type: String, required: true },
    forumPosts: [{
        type: Schema.Types.ObjectId,
        ref: "forumPost",
        required: true,
    }],
    schema_version: { type: Number }
});
const user = mongoose.model('user', userSchema);
module.exports = user;