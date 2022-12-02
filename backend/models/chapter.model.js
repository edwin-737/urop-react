const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chapterSchema = new Schema({
    name: { type: String, required: true },                                  //Name of chapter, number of chapter
    question: [{ type: Schema.Types.ObjectId, ref: 'question', required: true }],
    forumPost:[{type:Schema.Types.ObjectId,ref:'forumPost',required:true}],
    keywords: { type: String, required: true },
    schema_version:{type:Number,required:true,default:2}
},
    {
        timestamps: true,
    });
const chapter = mongoose.model("chapter", chapterSchema);
module.exports = chapter;