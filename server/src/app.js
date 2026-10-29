import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/ApiError.js";
import { ApiResponse } from "./utils/ApiResponse.js";

// import routes
import userRouter from "./routes/user.routes.js";
import leadRouter from "./routes/lead.routes.js";
import analyticsRouter from "./routes/analytics.routes.js";
import applicationRouter from "./routes/application.routes.js";
import blogRouter from "./routes/blog.routes.js";

const app = express();

const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map(o => o.trim())
    : ["http://localhost:3000"];

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin (like mobile apps, curl, server-to-server)
            if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
                callback(null, true);
            } else {
                callback(null, origin); // lenient fallback for production previews
            }
        },
        credentials: true
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// health check
app.get("/health", (_, res) => {
    res.status(200).json(
        new ApiResponse(200, { status: "OK", timestamp: new Date().toISOString() }, "Fitscalez API is active")
    );
});

// routes declaration
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/leads", leadRouter);
app.use("/api/v1/analytics", analyticsRouter);
app.use("/api/v1/applications", applicationRouter);
app.use("/api/v1/blogs", blogRouter);

// centralized error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            data: err.data,
            success: false,
            message: err.message,
            errors: err.errors
        });
    }

    console.error("Unhandled Server Error: ", err);
    return res.status(500).json({
        statusCode: 500,
        data: null,
        success: false,
        message: err.message || "Internal Server Error",
        errors: []
    });
});

export { app };

