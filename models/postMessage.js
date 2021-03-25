const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tag: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const postMessage=mongoose.model("postMessage",postSchema)
module.exports=postMessage