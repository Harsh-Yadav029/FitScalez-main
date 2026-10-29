import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Visitor } from "../models/visitor.model.js";
import { Lead } from "../models/lead.model.js";

// track visitor page view or session ping from client
const trackVisitor = asyncHandler(async (req, res) => {
    const {
        deviceId,
        page,
        referrer,
        country,
        city,
        region,
        deviceType,
        browser,
        os,
        duration
    } = req.body;

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";

    const visitor = await Visitor.create({
        ip: typeof ip === "string" ? ip.split(",")[0].trim() : "",
        deviceId: deviceId || "DEV-ANONYMOUS",
        page: page || "/",
        referrer: referrer || "Direct",
        country: country || "India",
        city: city || "Delhi",
        region: region || "",
        deviceType: deviceType || "desktop",
        browser: browser || "Chrome",
        os: os || "Windows",
        duration: duration || 0
    });

    return res
        .status(201)
        .json(new ApiResponse(201, { id: visitor._id }, "Visitor activity logged"));
});

// get KPI summary metrics and recent activity for the control center dashboard (admin)
const getAnalyticsStats = asyncHandler(async (req, res) => {
    const totalVisits = await Visitor.countDocuments();
    const uniqueVisitors = (await Visitor.distinct("deviceId")).length;

    // visits today
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const visitsToday = await Visitor.countDocuments({
        createdAt: { $gte: startOfToday }
    });

    // lead counters
    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: "new" });
    const contactedLeads = await Lead.countDocuments({ status: "contacted" });
    const inProgressLeads = await Lead.countDocuments({ status: "in-progress" });
    const closedLeads = await Lead.countDocuments({ status: "closed" });
    const todayLeads = await Lead.countDocuments({
        createdAt: { $gte: startOfToday }
    });

    // top visited pages
    const topPages = await Visitor.aggregate([
        { $group: { _id: "$page", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 8 }
    ]);

    // recent visitor stream (last 50 visits)
    const recentVisitors = await Visitor.find()
        .sort({ createdAt: -1 })
        .limit(50);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                traffic: {
                    totalVisits,
                    uniqueVisitors,
                    visitsToday,
                    topPages
                },
                leads: {
                    totalLeads,
                    newLeads,
                    contactedLeads,
                    inProgressLeads,
                    closedLeads,
                    todayLeads
                },
                recentVisitors
            },
            "Analytics stats fetched successfully"
        )
    );
});

export { trackVisitor, getAnalyticsStats };

