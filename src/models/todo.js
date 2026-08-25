import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  text: {
    type: String,
    required: [true, "Text is required"],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Todo", todoSchema);