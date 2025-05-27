import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setUser } from '@/redux/authSlice';

// Axios instance with baseURL and credentials
const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1/job',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to include token
api.interceptors.request.use((config) => {
    // Get token from cookies
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add response interceptor for debugging
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

const Job = ({ job }) => {
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    // Check if job is saved
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
            console.log('Attempting to save job:', job._id); // Debug log
            const endpoint = isSaved ? '/unsave' : '/save';
            const { data } = await api.post(endpoint, { jobId: job._id });
            
            if (data.success) {
                // Update the Redux store with the new savedJobs array
                const updatedUser = {
                    ...user,
                    savedJobs: data.savedJobs
                };
                dispatch(setUser(updatedUser));
                
                setIsSaved(!isSaved);
                toast.success(data.message);
            } else {
                toast.error(data.message || 'Error saving job');
            }
        } catch (error) {
            console.error('Error saving job:', error.response?.data || error);
            const errorMessage = error.response?.data?.message || 'Error saving job';
            toast.error(errorMessage);
            
            if (errorMessage.includes('already saved')) {
                setIsSaved(true);
            } else if (errorMessage.includes('not saved')) {
                setIsSaved(false);
            }
        } finally {
            setLoading(false);
        }
    };

    // ✅ Add this missing function
    const daysAgoFunction = (createdAt) => {
        const createdDate = new Date(createdAt);
        const now = new Date();
        const diffTime = now - createdDate;
        return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert ms to days
    };

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>
                    {daysAgoFunction(job?.createdAt) === 0
                        ? "Today"
                        : `${daysAgoFunction(job?.createdAt)} days ago`}
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
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary} LPA</Badge>
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
