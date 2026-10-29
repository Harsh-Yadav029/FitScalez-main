import mongoose, { Schema } from "mongoose";

const visitorSchema = new Schema(
    {
        ip: {
            type: String,
            default: ""
        },
        deviceId: {
            type: String,
            required: true,
            index: true
        },
        country: {
            type: String,
            default: "India"
        },
        city: {
            type: String,
            default: "Delhi"
        },
        region: {
            type: String,
            default: ""
        },
        deviceType: {
            type: String,
            enum: ["desktop", "mobile", "tablet", "unknown"],
            default: "desktop"
        },
        browser: {
            type: String,
            default: "Chrome"
        },
        os: {
            type: String,
            default: "Windows"
        },
        page: {
            type: String,
            required: true,
            default: "/"
        },
        referrer: {
            type: String,
            default: "Direct"
        },
        duration: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

export const Visitor = mongoose.model("Visitor", visitorSchema);

