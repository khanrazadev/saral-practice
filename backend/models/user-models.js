import mongoose from "mongoose";
import { StatusOptions } from "../constants.js";

const creatorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter the username of creator"],
      unique: [true, "Creator with this username already exists"],
      lowercase: true,
    },
    name: String,
    follower: Number,
    following: Number,
    bio: String,
    avatar: String,
    status: {
      type: String,
      default: StatusOptions.PROSPECTS,
    },
  },
  { timestamps: true }
);

export const Creator = mongoose.model("Creator", creatorSchema);
