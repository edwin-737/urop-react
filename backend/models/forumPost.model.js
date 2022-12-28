const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const forumPostSchema = new Schema({
    body: String,      //post body
    isReply: {
        type: Boolean,
        default: false,
        required: true
    },
    posterType: {
        type: Number,
        default: 0,
    }, // 0: student, 1: TA, 2: professor 
    upvotes: {
        type: Number,
        default: 0
    },
    anonymous: {
        type: Boolean,
        default: false,
    },
    edited: {
        type: Boolean,
        default: false,
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    responses: [{
        type: Schema.Types.ObjectId,
        ref: "forumPost",
    }],
    title: {
        type: String,
        required: false,
        default: "A forum Post by someone"
    },
    schema_version: {
        type: Number,
    },
    tags: [{
        type: String,
    }],
    parent: {
        type: Schema.Types.ObjectId,
        ref: "forumPost",
        required: false,
    },
}, {
    timestamps: true
});
const forumPost = mongoose.model("forumPost", forumPostSchema);
module.exports = forumPost;