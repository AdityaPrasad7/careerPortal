import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const { id } = useParams();
    useGetCompanyById(id);
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    // Initialize form with company data
    useEffect(() => {
        if (singleCompany) {
            setFormData({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: null // Don't pre-set file to avoid reference issues
            });
        }
    }, [singleCompany]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, file: e.target.files?.[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.name.trim()) {
            toast.error("Company name is required");
            return;
        }

        try {
            setLoading(true);
            const data = new FormData();
            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("website", formData.website);
            data.append("location", formData.location);
            if (formData.file) {
                data.append("profilePhoto", formData.file);
            }

            // Changed to match backend route
            const res = await axios.put(
                `${COMPANY_API_END_POINT}/update/${id}`, // Removed '/update'
                data,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error(
                error.response?.data?.message || 
                "Failed to update company. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={handleSubmit}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button 
                            onClick={() => navigate("/admin/companies")} 
                            variant="outline" 
                            className="flex items-center gap-2 text-gray-500 font-semibold"
                            type="button"
                        >
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    
                    <div className='grid grid-cols-2 gap-4'>
                        {['name', 'description', 'website', 'location'].map((field) => (
                            <div key={field}>
                                <Label>
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </Label>
                                <Input
                                    type="text"
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>
                        ))}
                        
                        <div>
                            <Label>Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full my-4"
                        disabled={loading || !formData.name.trim()}
                    >
                        {loading ? (
                            <>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </>
                        ) : 'Update'}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default CompanySetup;