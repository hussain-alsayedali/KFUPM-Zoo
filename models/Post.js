const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default : 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    required: true,
    enum: ["fox", "bird", "duck" , "oria", "cat" ]
  }
});

module.exports = mongoose.model("Post", PostSchema);
