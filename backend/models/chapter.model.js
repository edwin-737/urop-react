const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chapterSchema = new Schema({
    code: { type: Number, required: true },
    name: { type: String, required: true },                                  //Name of chapter, number of chapter
    questions: [{ type: Schema.Types.ObjectId, ref: 'question' }],
    forumPosts: [{ type: Schema.Types.ObjectId, ref: 'forumPost' }],
    schema_version: { type: Number, required: true, default: 2 },
    url: { type: String, required: true, default: 'default' },
    subchapters: [{ type: Schema.Types.ObjectId, ref: 'chapter' }],
    isSubchapter: { type: Boolean, required: true }
},
    {
        timestamps: true,
    });
const chapter = mongoose.model("chapter", chapterSchema);
module.exports = chapter;