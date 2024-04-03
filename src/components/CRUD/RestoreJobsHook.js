// RestoreJobsHook.js
import {
    useCallback
} from 'react';

const useHandleRestore = (setJobPosts) => {

    const handleRestore = useCallback(async (jobId) => {
        try {
            const response = await fetch(`http://localhost:5000/jobpost/restore/${jobId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to restore the job.');
            }

            setJobPosts(prevJobPosts => {
                const jobIndex = prevJobPosts.findIndex(job => job._id === jobId);
                if (jobIndex !== -1) {
                    const newJobPosts = [...prevJobPosts];
                    newJobPosts[jobIndex].isDeleted = false;
                    newJobPosts[jobIndex].deletedAt = null;
                    return newJobPosts;
                }
                return prevJobPosts;
            });
        } catch (error) {
            console.error('Error restoring the job:', error);
        }
    }, [setJobPosts]);

    return {
        handleRestore
    };
};

export default useHandleRestore;