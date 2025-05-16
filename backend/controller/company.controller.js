import Company from "../models/company.model.js"; // Adjust the path if necessary

// Register a new company
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }

        // Check if company already exists
        const existingCompany = await Company.findOne({ name: companyName });
        if (existingCompany) {
            return res.status(400).json({
                message: "You can't register the same company again!",
                success: false
            });
        }

        // Create new company
        const newCompany = await Company.create({
            name: companyName,
            userId: req.id // Make sure your auth middleware sets req.id
        });

        return res.status(201).json({
            message: "Company registered successfully!",
            success: true,
            company: newCompany
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error while registering company.",
            success: false
        });
    }
};

// Get all companies for the logged-in user
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });

        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "No companies found.",
                success: false
            });
        }

        return res.status(200).json({
            companies,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error while fetching companies.",
            success: false
        });
    }
};

// Get a single company by ID
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            company,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error while fetching company.",
            success: false
        });
    }
};

// Update a company by ID
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;

        // Only include fields that are provided
        const updateData = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (website) updateData.website = website;
        if (location) updateData.location = location;

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated successfully.",
            success: true,
            company
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error while updating company.",
            success: false
        });
    }
};
