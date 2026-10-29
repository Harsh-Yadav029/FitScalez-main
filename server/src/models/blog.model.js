import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
    {
        slug: {
            type: String,
            required: [true, "Slug is required"],
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true
        },
        metaTitle: {
            type: String,
            default: ""
        },
        metaDesc: {
            type: String,
            default: ""
        },
        category: {
            type: String,
            default: "Web Development",
            index: true
        },
        readTime: {
            type: String,
            default: "5 min read"
        },
        date: {
            type: String,
            default: ""
        },
        author: {
            type: String,
            default: "Divyansh"
        },
        authorRole: {
            type: String,
            default: "Lead Web Developer"
        },
        primaryKeyword: {
            type: String,
            default: ""
        },
        secondaryKeywords: {
            type: String,
            default: ""
        },
        searchIntent: {
            type: String,
            default: ""
        },
        summary: {
            type: String,
            default: ""
        },
        toc: [
            {
                id: { type: String },
                title: { type: String }
            }
        ],
        contentHtml: {
            type: String,
            default: ""
        },
        published: {
            type: Boolean,
            default: true,
            index: true
        }
    },
    {
        timestamps: true
    }
);

export const Blog = mongoose.model("Blog", blogSchema);

