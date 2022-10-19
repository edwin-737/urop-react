const mongoose = require("mongoose");
const { question } = require("readline-sync");
const Schema = mongoose.Schema;
const studentQuerySchema = new Schema({
    body: String,
    upvotes: {
        type: Number,
        default: 0
    },
    anonymous: {
        type: Boolean,
        default: false,
    },
    postedBy: {
        student: {
            type: Schema.Types.ObjectId,
            ref: "student",
        }
    },
    edited: {
        type: Boolean,
        default: false,
    },
    response: {
        type: Schema.Types.ObjectId,
        ref: "response",
    }
}, {
    timestamps: true
});
const studentQuery = mongoose.model("studentQuery", studentQuerySchema);
module.exports = studentQuery;