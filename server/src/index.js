import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

// configure dotenv
dotenv.config({
    path: "./.env"
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
        console.error("MongoDB connection failed! Starting server in offline/degraded mode...", err);
        app.listen(PORT, () => {
            console.log(`⚙️  Fitscalez Server running (degraded mode) at http://localhost:${PORT}`);
        });
    });

