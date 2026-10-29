import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db/index.js";
import { Blog } from "./models/blog.model.js";
import { User } from "./models/user.model.js";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const seedDatabase = async () => {
    try {
        await connectDB();

        // 1. Seed Default Admin if none exists
        const adminExists = await User.findOne({ username: "admin" });
        if (!adminExists) {
            await User.create({
                fullName: "Divyansh Saini",
                email: "fitscalezofficial@gmail.com",
                username: "admin",
                password: "adminpassword123" // will be hashed automatically by pre("save")
            });
            console.log("✅ Default admin seeded: username='admin', password='adminpassword123'");
        } else {
            console.log("ℹ️ Admin user already exists");
        }

        // 2. Seed Articles if articles.json is found
        const possiblePaths = [
            path.resolve("../client/lib/articles.json"),
            path.resolve("../lib/articles.json"),
            path.resolve("./articles.json"),
            path.resolve("../scratch/fitscalez/fitscalez-main/articles_data.json")
        ];
        const articlesPath = possiblePaths.find((p) => fs.existsSync(p));
        if (articlesPath) {
            const rawData = fs.readFileSync(articlesPath, "utf-8");
            const articles = JSON.parse(rawData);

            let seededCount = 0;
            for (const item of articles) {
                const exists = await Blog.findOne({ slug: item.slug });
                if (!exists) {
                    await Blog.create({
                        slug: item.slug,
                        title: item.title,
                        metaTitle: item.metaTitle || item.title,
                        metaDesc: item.metaDesc || "",
                        category: item.category || "Web Development",
                        readTime: item.readTime || "5 min read",
                        date: item.date || "Sep 2026",
                        author: item.author || "Divyansh",
                        authorRole: item.authorRole || "Lead Web Developer",
                        primaryKeyword: item.primaryKeyword || "",
                        secondaryKeywords: item.secondaryKeywords || "",
                        searchIntent: item.searchIntent || "",
                        summary: item.summary || "",
                        toc: item.toc || [],
                        contentHtml: "",
                        published: true
                    });
                    seededCount++;
                }
            }
            console.log(`✅ Seeded ${seededCount} blog articles into MongoDB.`);
        }

        console.log("🎉 Seeding complete!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding error:", error);
        process.exit(1);
    }
};

seedDatabase();

