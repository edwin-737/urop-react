const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chapterSchema = new Schema({
    name: { type: String, required: true },                                  //Name of chapter, number of chapter
    question: { type: Schema.Types.ObjectId, ref: 'question', required: true },

},
    {
        timestamps: true,
    });
const chapter = mongoose.model("chapter", chapterSchema);
module.exports = chapter;