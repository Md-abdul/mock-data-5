const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  name: String,
  image: String,
  specialization: String,
  experience: Number,
  location: String,
  date: String,
  slots: Number,
  fee: Number,
});

const PostModel = mongoose.model("post", PostSchema);

module.exports = PostModel;
