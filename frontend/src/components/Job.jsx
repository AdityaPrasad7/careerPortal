import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// Add this OUTSIDE the component (right after imports)
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // Match your backend
  withCredentials: true
});

const Job = ({ job }) => {
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);

    // Check if job is saved when component mounts
    useEffect(() => {
        if (user && user.savedJobs?.includes(job._id)) {
            setIsSaved(true);
        }
    }, [job._id, user]);

    const handleSaveJob = async () => {
        if (!user) {
            toast.info('Please login to save jobs');
            return navigate('/login');
        }

        setLoading(true);
        try {
            const endpoint = isSaved ? '/job/unsave' : '/job/save'; // Updated endpoint
            await api.post(endpoint, { jobId: job._id }); // Using the api instance
            
            setIsSaved(!isSaved);
            toast.success(isSaved ? 'Job removed from saved' : 'Job saved successfully');
        } catch (error) {
            console.error('Error saving job:', error);
            toast.error(error.response?.data?.message || 'Error saving job');
            setIsSaved(isSaved);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button 
                    variant="outline" 
                    className="rounded-full" 
                    size="icon"
                    onClick={handleSaveJob}
                    disabled={loading}
                >
                    <Bookmark fill={isSaved ? "currentColor" : "none"} />
                </Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-3'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button 
                    className="bg-[#7209b7] hover:bg-[#5d0a99]" 
                    onClick={handleSaveJob}
                    disabled={loading}
                >
                    {loading ? 'Processing...' : isSaved ? 'Saved' : 'Save For Later'}
                </Button>
            </div>
        </div>
    );
};

export default Job;