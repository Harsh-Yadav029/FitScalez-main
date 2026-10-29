import { Router } from "express";
import {
    getAllBlogs,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog
} from "../controllers/blog.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// public routes
router.route("/").get(getAllBlogs);
router.route("/:slug").get(getBlogBySlug);

// secured admin routes
router.route("/").post(verifyJWT, createBlog);
router.route("/:id").patch(verifyJWT, updateBlog);
router.route("/:id").delete(verifyJWT, deleteBlog);

export default router;

