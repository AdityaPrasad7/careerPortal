import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import Navbar from './shared/Navbar';
import AppliedJobTable from './AppliedJobTable';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import { Badge } from './ui/badge'

const AppliedJobsPage = () => {
    // Fetch applied jobs data
    useGetAppliedJobs();
    const navigate = useNavigate();
    const { allAppliedJobs } = useSelector(store => store.job);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Button 
                                    onClick={() => navigate(-1)} 
                                    variant="outline" 
                                    size="sm"
                                    className="hover:bg-gray-100"
                                >
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back
                                </Button>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Your Job Applications
                                </h1>
                            </div>
                            <Badge variant="secondary" className="px-3 py-1">
                                {allAppliedJobs.length} {allAppliedJobs.length === 1 ? 'Application' : 'Applications'}
                            </Badge>
                        </div>
                    </div>

                    <div className="p-6">
                        <AppliedJobTable />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AppliedJobsPage;