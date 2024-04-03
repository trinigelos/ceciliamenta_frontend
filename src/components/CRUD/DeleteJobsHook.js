// DeleteJobsHook.js
// Function: Delete from the database the jobs.

import { useCallback } from 'react';

const useHandleDelete = (setJobPosts) => {

    const handleDelete = useCallback(async (jobId) => {
        try {
            const response = await fetch(`http://localhost:5000/jobpost/${jobId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete the job.');
            }

            setJobPosts(prevJobPosts => prevJobPosts.filter(job => job._id !== jobId));
        } catch (error) {
            console.error('Error deleting the job:', error);
        }
    }, [setJobPosts]);

    return {
        handleDelete
    };
};

export default useHandleDelete;
