import express from "express";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  // const { page } = req.query;

  try {
    // const LIMIT = 6;
    // // get the starting index of every page
    // const startIndex = (Number(page) - 1) * LIMIT;
    // const total = await PostMessage.countDocuments({});

    const posts = await PostMessage.find();
    // .sort({ _id: -1 })
    // .limit(LIMIT)
    // .skip(startIndex);

    res.json({
      data: posts,
      // currentPage: Number(page),
      // numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    // 404 - not found
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);
    // 200 - OK
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  // const { searchQuery, tags } = req.query;

  try {
    const message = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({ message });
    // const title = new RegExp(searchQuery, "i");
    // const posts = await PostMessage.find({ title });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    // toISOString - returns a string in simplified extended ISO format
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();
    // 201 - created
    res.status(201).json(newPostMessage);
  } catch (error) {
    // 409 - conflict
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, theme, materials } = req.body;
  // const { title, message, creator, selectedFile, tags } = req.body;

  // if there is no post id in db
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { title, message, creator, theme, materials, _id: id };
  // const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  // if there is no post id in db
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  // if there is no post id in db
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    // like the post
    post.likes.push(req.userId);
  } else {
    // dislike the post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
};

export default router;
