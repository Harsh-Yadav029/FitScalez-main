import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema(
    {
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
            index: true
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true
        },
        role: {
            type: String,
            required: [true, "Applied role is required"],
            trim: true
        },
        experience: {
            type: String,
            default: "Fresher"
        },
        portfolioUrl: {
            type: String,
            trim: true,
            default: ""
        },
        resumeUrl: {
            type: String,
            trim: true,
            default: ""
        },
        coverNote: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            enum: ["pending", "reviewed", "shortlisted", "rejected"],
            default: "pending",
            index: true
        }
    },
    {
        timestamps: true
    }
);

export const Application = mongoose.model("Application", applicationSchema);

