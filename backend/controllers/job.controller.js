import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";

// Admin posts a job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        };

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error creating job",
            error: error.message,
            success: false
        });
    }
};

// Get all jobs for students
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            });
        };

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching jobs",
            error: error.message,
            success: false
        });
    }
};

// Get job by ID
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        };

        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching job",
            error: error.message,
            success: false
        });
    }
};

// Get admin's posted jobs
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company',
            createdAt: -1
        });

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            });
        };

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching admin jobs",
            error: error.message,
            success: false
        });
    }
};

// Save a job for later
export const saveJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.id;

        console.log('Save job request:', { jobId, userId });

        if (!jobId) {
            console.log('Job ID missing');
            return res.status(400).json({
                message: "Job ID is required",
                success: false
            });
        }

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            console.log('Job not found:', jobId);
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found:', userId);
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Check if job is already saved
        const isAlreadySaved = user.savedJobs.some(id => id.toString() === jobId);
        if (isAlreadySaved) {
            console.log('Job already saved:', jobId);
            return res.status(400).json({
                message: "Job is already saved",
                success: false
            });
        }

        // Add to saved jobs
        user.savedJobs.push(jobId);
        await user.save();

        console.log('Job saved successfully:', { jobId, userId });

        return res.status(200).json({
            message: "Job saved successfully",
            success: true,
            savedJobs: user.savedJobs
        });
    } catch (error) {
        console.error("Save job error:", error);
        return res.status(500).json({
            message: "Error saving job",
            error: error.message,
            success: false
        });
    }
};

// Unsave a job
export const unsaveJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.id;

        console.log('Unsave job request:', { jobId, userId });

        if (!jobId) {
            console.log('Job ID missing');
            return res.status(400).json({
                message: "Job ID is required",
                success: false
            });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found:', userId);
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Check if job is saved
        const isSaved = user.savedJobs.some(id => id.toString() === jobId);
        if (!isSaved) {
            console.log('Job not saved:', jobId);
            return res.status(400).json({
                message: "Job is not saved",
                success: false
            });
        }

        // Remove from saved jobs
        user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
        await user.save();

        console.log('Job unsaved successfully:', { jobId, userId });

        return res.status(200).json({
            message: "Job removed from saved",
            success: true,
            savedJobs: user.savedJobs
        });
    } catch (error) {
        console.error("Unsave job error:", error);
        return res.status(500).json({
            message: "Error unsaving job",
            error: error.message,
            success: false
        });
    }
};

// Get user's saved jobs
export const getSavedJobs = async (req, res) => {
    try {
        const userId = req.id;

        const user = await User.findById(userId).populate({
            path: 'savedJobs',
            populate: {
                path: 'company',
                model: 'Company'
            }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        return res.status(200).json({
            savedJobs: user.savedJobs,
            success: true
        });
    } catch (error) {
        console.error("Get saved jobs error:", error);
        return res.status(500).json({
            message: "Error fetching saved jobs",
            error: error.message,
            success: false
        });
    }
};