import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Application } from "../models/application.model.js";

// submit job application from careers page (public)
const createApplication = asyncHandler(async (req, res) => {
    const {
        fullName,
        email,
        phone,
        role,
        experience,
        portfolioUrl,
        resumeUrl,
        coverNote
    } = req.body;

    if (!fullName || !email || !phone || !role) {
        throw new ApiError(400, "Full name, email, phone, and role are required");
    }

    const application = await Application.create({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        role: role.trim(),
        experience: experience ? experience.trim() : "Fresher",
        portfolioUrl: portfolioUrl ? portfolioUrl.trim() : "",
        resumeUrl: resumeUrl ? resumeUrl.trim() : "",
        coverNote: coverNote ? coverNote.trim() : ""
    });

    return res
        .status(201)
        .json(new ApiResponse(201, application, "Application submitted successfully"));
});

// get all job applications (admin)
const getAllApplications = asyncHandler(async (req, res) => {
    const { status, role } = req.query;

    const query = {};
    if (status) query.status = status;
    if (role) query.role = role;

    const applications = await Application.find(query).sort({ createdAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, applications, "Applications fetched successfully"));
});

// update application status (admin)
const updateApplicationStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        throw new ApiError(400, "Status is required");
    }

    const application = await Application.findByIdAndUpdate(
        id,
        { $set: { status } },
        { new: true, runValidators: true }
    );

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, application, "Application status updated successfully"));
});

// delete application (admin)
const deleteApplication = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const application = await Application.findByIdAndDelete(id);

    if (!application) {
        throw new ApiError(404, "Application not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Application deleted successfully"));
});

export {
    createApplication,
    getAllApplications,
    updateApplicationStatus,
    deleteApplication
};

