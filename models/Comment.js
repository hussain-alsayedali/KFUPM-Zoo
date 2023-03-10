const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", 
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  likedBy : {
    type: [mongoose.Schema.Types.ObjectId],
    ref : "user",
    default: [],
  },
  dislikedBy : {
    type: [mongoose.Schema.Types.ObjectId],
    ref : "user",
    default: [],
  },
  score: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
