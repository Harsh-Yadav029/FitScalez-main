import mongoose from "mongoose";
import dns from "node:dns";

// Fix for Windows & ISP local DNS servers that refuse SRV record resolution (querySrv ECONNREFUSED)
try {
    dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
} catch (dnsErr) {
    console.warn("Notice: Custom DNS servers could not be set. Using system default.", dnsErr?.message);
}

// connect to mongodb database
const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        throw new Error("MONGODB_URI environment variable is not defined");
    }

    try {
        const connectionInstance = await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 15000,
        });
        console.log(`\n✅ MongoDB connected successfully! DB HOST: ${connectionInstance.connection.host}`);
        return connectionInstance;
    } catch (error) {
        console.error("❌ MONGODB connection FAILED: ", error.message || error);
        throw error;
    }
};

export default connectDB;
