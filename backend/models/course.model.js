const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const courseSchema = new Schema({
    name: String,
    users: [{ type: Schema.Types.ObjectId, ref: "user" }],
    chapters: [{ type: Schema.Types.ObjectId, ref: "chapter" }],
    forumPosts: [{ type: Schema.Types.ObjectId, ref: "forumPost" }]
});
const course = mongoose.model("course", courseSchema);
module.exports = course;