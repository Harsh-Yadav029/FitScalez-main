import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import connectDB from "./db/index.js";
import { app } from "./app.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// configure dotenv to load server/.env regardless of current working directory
dotenv.config({
    path: path.resolve(__dirname, "../.env")
});

const PORT = process.env.PORT || 8000;

// connect to database and launch server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`⚙️  Fitscalez Server is running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed! Starting server in offline/degraded mode...", err.message || err);
        app.listen(PORT, () => {
            console.log(`⚙️  Fitscalez Server running (degraded mode) at http://localhost:${PORT}`);
        });
    });
