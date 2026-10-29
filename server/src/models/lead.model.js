import mongoose, { Schema } from "mongoose";

const leadSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
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
        company: {
            type: String,
            trim: true,
            default: ""
        },
        service: {
            type: String,
            trim: true,
            default: "Web Development"
        },
        budget: {
            type: String,
            trim: true,
            default: "Flexible"
        },
        message: {
            type: String,
            required: [true, "Message is required"]
        },
        status: {
            type: String,
            enum: ["new", "contacted", "in-progress", "closed"],
            default: "new",
            index: true
        },
        notes: {
            type: String,
            default: ""
        },
        deviceId: {
            type: String,
            default: ""
        },
        visitCount: {
            type: Number,
            default: 1
        },
        location: {
            type: Schema.Types.Mixed,
            default: null
        },
        device: {
            type: Schema.Types.Mixed,
            default: null
        }
    },
    {
        timestamps: true
    }
);

export const Lead = mongoose.model("Lead", leadSchema);

