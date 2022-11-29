const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: { type: String, required: true },                             //user's legal name
    participation: { type: Number, default: 0 },                         //fill if its a student user
    email: { type: Schema.Types.ObjectId, ref: 'email' },
    type: { type: Number, required: true },                 //0 for student, 1 for TA, 2 for professor
    pillar: { type: String, required: true },
    enrollmentPeriod: { type: String, required: true },
});
const user = mongoose.model('user', userSchema);
module.exports = user;