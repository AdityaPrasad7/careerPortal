import React, { useState, useEffect } from 'react'
import Navbar from './shared/Navbar'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'

const SavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchSavedJobs = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get('http://localhost:8000/api/v1/job/saved', { withCredentials: true })
                if (data.success) {
                    setSavedJobs(data.savedJobs)
                } else {
                    console.error('Failed to fetch saved jobs:', data.message)
                    toast.error('Failed to fetch saved jobs')
                }
            } catch (error) {
                console.error('Failed to fetch saved jobs:', error.response?.data?.message || error.message)
                toast.error('Failed to fetch saved jobs')
            } finally {
                setLoading(false)
            }
        }
        fetchSavedJobs()
    }, [])

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto bg-white rounded-2xl p-8 my-5">
                <div className="flex justify-between items-center mb-5">
                    <h1 className="text-2xl font-bold">Saved Jobs</h1>
                    <Button onClick={() => navigate('/profile')} variant="outline">
                        Back to Profile
                    </Button>
                </div>

                {loading ? (
                    <div className="text-center py-4">
                        <p>Loading saved jobs...</p>
                    </div>
                ) : savedJobs.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500 text-lg">No saved jobs yet.</p>
                        <Button 
                            onClick={() => navigate('/')} 
                            className="mt-4"
                            variant="outline"
                        >
                            Browse Jobs
                        </Button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="border border-gray-300 p-3 text-left">Title</th>
                                    <th className="border border-gray-300 p-3 text-left">Company</th>
                                    <th className="border border-gray-300 p-3 text-left">Location</th>
                                    <th className="border border-gray-300 p-3 text-left">Salary</th>
                                    <th className="border border-gray-300 p-3 text-left">Job Type</th>
                                    <th className="border border-gray-300 p-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {savedJobs.map(job => (
                                    <tr key={job._id} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 p-3">{job.title}</td>
                                        <td className="border border-gray-300 p-3">{job.company?.name || 'N/A'}</td>
                                        <td className="border border-gray-300 p-3">{job.location}</td>
                                        <td className="border border-gray-300 p-3">{job.salary} LPA</td>
                                        <td className="border border-gray-300 p-3">{job.jobType}</td>
                                        <td className="border border-gray-300 p-3">
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => navigate(`/description/${job._id}`)}
                                            >
                                                View Details
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SavedJobs 