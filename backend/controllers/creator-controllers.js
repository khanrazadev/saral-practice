import asyncHandler from "express-async-handler";
import { fetchCreatorData } from "../utils/insta-api-utils.js";
import { Creator } from "../models/user-models.js";

//@desc Create Creator
//@route POST
//@access Public
export const createCreator = asyncHandler(async (req, res) => {
  const { username } = req.body;
  if (!username) {
    res.status(404);
    throw new Error("Please write the username");
  }

  const creatorData = await fetchCreatorData(username);
  if (!creatorData) {
    res.status(400);
    throw new Error("ERROR: GETTING DATA FROM INSTA API");
  }

  const exist = await Creator.findOne({ username });
  if (exist) {
    res.status(400);
    throw new Error("Creator Already Exists");
  }

  const newCreatorData = {
    username: creatorData.username,
    name: creatorData.full_name,
    follower: creatorData.follower_count,
    following: creatorData.following_count,
    bio: creatorData.biography,
    avatar: creatorData.profile_pic_url_hd,
  };

  console.log(newCreatorData);

  const newCreator = await Creator.create(newCreatorData);

  res.status(200).json({
    message: "Creator added successfully",
    data: newCreator,
  });
});

//@desc update status of creator
//@route PUT
//@access Public
export const updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { newStatus } = req.body;

  if (!id || !newStatus) {
    res.status(400);
    throw new Error("Please provide user ID and status");
  }

  // Update creator status
  const updatedCreator = await Creator.findByIdAndUpdate(
    id,
    { status: newStatus },
    { new: true }
  );

  console.log("working till here");
  if (!updatedCreator) {
    res.status(404);
    throw new Error("Creator not found");
  }

  res.status(200).json({
    message: "Creator's status updated successfully",
    data: updatedCreator,
  });
});

//@desc get all the creator
//@route GET
//@access Public
export const getAllCreator = asyncHandler(async (req, res) => {
  const creators = await Creator.find({});
  if (!creators || creators.length === 0) {
    res.status(404);
    throw new Error("Creator not found");
  }

  res
    .status(200)
    .json({ message: "fetched creators successfully", data: creators });
});

//@desc get all the creator
//@route GET
//@access Public
export const deleteCreator = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Please provide creator id");
  }

  const creator = await Creator.findByIdAndDelete(id);

  if (!creator) {
    res.status(404);
    throw new Error("Creator not found");
  }
  res
    .status(200)
    .json({ message: "Creator deleted successfully", data: creator });
});
