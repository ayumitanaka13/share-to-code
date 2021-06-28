import express from "express";

import {
  getPosts,
  getPost,
  getPostsBySearch,
  createPost,
  updatePost,
  likePost,
  deletePost,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

const sayHello = (req, res, next) => {
  console.log("SAY HELLO");
  next();
};

router.get("/search", sayHello, getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", auth, createPost);
// patch - a method to partially update a resource
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
