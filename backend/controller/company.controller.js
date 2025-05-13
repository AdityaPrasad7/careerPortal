import { Company } from "../models/company.model";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json
                ({
                    message:"Company name is required.",
                    success:false
                });
        }
        let company = await Company.findOne({name: companyName});
        return res.status(400).json({
            message:"You can't register same company again!",
            success:false
        });
        company = await Company.create({
            name:companyName,
            userId:req.Id
        })
    } catch (error) {
        console.log(error);
    }
}