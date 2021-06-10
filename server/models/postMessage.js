import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  username: String,
  creator: String,
  theme: {
    type: String,
    required: true,
  },
  materials: {
    type: [String],
    required: true,
    // first: {
    //   type: String,
    //   required: true,
    // },
    // second: String,

    // third: String,
  },
  // tags: [String],
  // selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
