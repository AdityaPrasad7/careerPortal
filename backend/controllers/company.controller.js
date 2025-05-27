import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        
        // Validate company name
        if (!companyName || typeof companyName !== 'string' || companyName.trim().length === 0) {
            return res.status(400).json({
                message: "Valid company name is required.",
                success: false
            });
        }

        // Check if user is authenticated
        if (!req.id) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        // Check if company already exists
        let company = await Company.findOne({ name: companyName.trim() });
        if (company) {
            return res.status(400).json({
                message: "A company with this name already exists.",
                success: false
            });
        }

        // Create new company
        company = await Company.create({
            name: companyName.trim(),
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        });
    } catch (error) {
        console.error('Company registration error:', error);
        return res.status(500).json({
            message: "Error registering company",
            error: error.message,
            success: false
        });
    }
}
export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const companyId = req.params.id;

        // Validate required fields
        if (!name) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }

        // Prepare update data
        const updateData = { 
            name: name.trim(),
            description: description?.trim(),
            website: website?.trim(),
            location: location?.trim()
        };

        // Handle logo upload if file is present
        if (req.file) {
            try {
                const fileUri = getDataUri(req.file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                    folder: "company_logos",
                    width: 300,
                    crop: "scale"
                });
                updateData.logo = cloudResponse.secure_url;
            } catch (uploadError) {
                console.error('Logo upload error:', uploadError);
                return res.status(500).json({
                    message: "Error uploading company logo",
                    success: false
                });
            }
        }

        // Update company
        const company = await Company.findByIdAndUpdate(
            companyId,
            updateData,
            { new: true }
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated successfully",
            company,
            success: true
        });

    } catch (error) {
        console.error('Company update error:', error);
        return res.status(500).json({
            message: "Error updating company information",
            error: error.message,
            success: false
        });
    }
}