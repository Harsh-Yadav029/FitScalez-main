import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Blog } from "../models/blog.model.js";

// get all published blog articles (public)
const getAllBlogs = asyncHandler(async (req, res) => {
    const { category, search, page = 1, limit = 20 } = req.query;

    const query = { published: true };

    if (category && category !== "All") {
        query.category = category;
    }

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { summary: { $regex: search, $options: "i" } },
            { primaryKeyword: { $regex: search, $options: "i" } }
        ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const blogs = await Blog.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum);

    const totalBlogs = await Blog.countDocuments(query);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                blogs,
                totalBlogs,
                page: pageNum,
                totalPages: Math.ceil(totalBlogs / limitNum)
            },
            "Articles fetched successfully"
        )
    );
});

// get blog article by slug (public)
const getBlogBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug: slug.toLowerCase() });

    if (!blog) {
        throw new ApiError(404, "Article not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, blog, "Article fetched successfully"));
});

// create new blog article (admin)
const createBlog = asyncHandler(async (req, res) => {
    const {
        slug,
        title,
        metaTitle,
        metaDesc,
        category,
        readTime,
        date,
        author,
        authorRole,
        primaryKeyword,
        secondaryKeywords,
        searchIntent,
        summary,
        toc,
        contentHtml,
        published
    } = req.body;

    if (!slug || !title) {
        throw new ApiError(400, "Slug and Title are required");
    }

    const existingBlog = await Blog.findOne({ slug: slug.toLowerCase() });
    if (existingBlog) {
        throw new ApiError(409, "Article with this slug already exists");
    }

    const blog = await Blog.create({
        slug: slug.toLowerCase().trim(),
        title: title.trim(),
        metaTitle: metaTitle || title,
        metaDesc: metaDesc || "",
        category: category || "Web Development",
        readTime: readTime || "5 min read",
        date: date || new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        author: author || "Divyansh",
        authorRole: authorRole || "Lead Web Developer",
        primaryKeyword: primaryKeyword || "",
        secondaryKeywords: secondaryKeywords || "",
        searchIntent: searchIntent || "",
        summary: summary || "",
        toc: toc || [],
        contentHtml: contentHtml || "",
        published: published !== undefined ? published : true
    });

    return res
        .status(201)
        .json(new ApiResponse(201, blog, "Article created successfully"));
});

// update article (admin)
const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const blog = await Blog.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true, runValidators: true }
    );

    if (!blog) {
        throw new ApiError(404, "Article not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, blog, "Article updated successfully"));
});

// delete article (admin)
const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
        throw new ApiError(404, "Article not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Article deleted successfully"));
});

export {
    getAllBlogs,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog
};

