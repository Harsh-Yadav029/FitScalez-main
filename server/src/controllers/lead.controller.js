import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Lead } from "../models/lead.model.js";

// submit a new lead inquiry from public website
const createLead = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        phone,
        company,
        service,
        budget,
        message,
        deviceId,
        location,
        device
    } = req.body;

    if (!name || !email || !phone || !message) {
        throw new ApiError(400, "Name, email, phone, and message are required fields");
    }

    const lead = await Lead.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        company: company ? company.trim() : "",
        service: service ? service.trim() : "Web Development",
        budget: budget ? budget.trim() : "Flexible",
        message: message.trim(),
        deviceId: deviceId || "",
        location: location || null,
        device: device || null
    });

    return res
        .status(201)
        .json(new ApiResponse(201, lead, "Inquiry submitted successfully"));
});

// get all leads with filtering, search, and pagination (admin)
const getAllLeads = asyncHandler(async (req, res) => {
    const { status, search, page = 1, limit = 20 } = req.query;

    const query = {};

    if (status && status !== "all") {
        query.status = status;
    }

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
            { company: { $regex: search, $options: "i" } },
            { service: { $regex: search, $options: "i" } }
        ];
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const leads = await Lead.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum);

    const totalLeads = await Lead.countDocuments(query);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                leads,
                totalLeads,
                page: pageNum,
                totalPages: Math.ceil(totalLeads / limitNum)
            },
            "Leads fetched successfully"
        )
    );
});

// get lead by ID (admin)
const getLeadById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const lead = await Lead.findById(id);

    if (!lead) {
        throw new ApiError(404, "Lead not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, lead, "Lead details fetched successfully"));
});

// update lead status and internal notes (admin)
const updateLeadStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status, notes } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (typeof notes === "string") updateData.notes = notes;

    const updatedLead = await Lead.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    if (!updatedLead) {
        throw new ApiError(404, "Lead not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedLead, "Lead status updated successfully"));
});

// delete lead (admin)
const deleteLead = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedLead = await Lead.findByIdAndDelete(id);

    if (!deletedLead) {
        throw new ApiError(404, "Lead not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Lead deleted successfully"));
});

// export all leads as CSV (admin)
const exportLeadsCSV = asyncHandler(async (req, res) => {
    const leads = await Lead.find().sort({ createdAt: -1 });

    const headers = [
        "ID",
        "Name",
        "Email",
        "Phone",
        "Company",
        "Service",
        "Budget",
        "Status",
        "Created At",
        "Message",
        "Notes"
    ];

    const rows = leads.map((l) => [
        `"${l._id}"`,
        `"${(l.name || "").replace(/"/g, '""')}"`,
        `"${(l.email || "").replace(/"/g, '""')}"`,
        `"${(l.phone || "").replace(/"/g, '""')}"`,
        `"${(l.company || "").replace(/"/g, '""')}"`,
        `"${(l.service || "").replace(/"/g, '""')}"`,
        `"${(l.budget || "").replace(/"/g, '""')}"`,
        `"${l.status}"`,
        `"${new Date(l.createdAt).toISOString()}"`,
        `"${(l.message || "").replace(/"/g, '""')}"`,
        `"${(l.notes || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="fitscalez_leads.csv"');
    return res.status(200).send(csvContent);
});

export {
    createLead,
    getAllLeads,
    getLeadById,
    updateLeadStatus,
    deleteLead,
    exportLeadsCSV
};

