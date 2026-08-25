import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate user emails
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true, // Will store the bcrypt hashed password
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);