// Dashboard.jsx
import React, { useState, useEffect } from "react"
import "./Dashboard.css"
import { useAuth } from "../contexts/authContext"
import JobPostForm from "../components/CRUD/PostForm"
import JobsTab from "./JobsTab"
import "./jobsTab.css"
import SearchBar from "../components/SearchBar"
import useHandleDelete from "../components/CRUD/DeleteJobsHook"
import useHandleRestore from "../components/CRUD/RestoreJobsHook"

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("TRABAJOS")
    const { logout } = useAuth()
    const [jobPosts, setJobPosts] = useState([])
    const [jobToEdit, setJobToEdit] = useState(null)
    const { handleDelete } = useHandleDelete(setJobPosts)
    const { handleRestore } = useHandleRestore(setJobPosts)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // toggle button for sidebar for responsive layout



    const handleJobUpdated = (updatedJob) => {
        setJobPosts(
            jobPosts.map((job) =>
                job._id === updatedJob._id ? updatedJob : job
            )
        )
    }

    // make searchbar functional:
    const onSearch = (searchTerm, location) => {
        fetchJobPosts(searchTerm, location);
    };
    

    // Fetch job posts from the backend
    const fetchJobPosts = async (searchTerm = '', location = '') => {
        try {
            const response = await fetch(`http://localhost:5000/jobposts?searchTerm=${searchTerm}&location=${location}`);
            const data = await response.json()
            console.log("Data received from backend:", data);

            // Sort posts by createdAt date in descending order
            const sortedData = data.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )

            setJobPosts(sortedData)
        } catch (error) {
            console.error("Error fetching job posts:", error)
        }
    }

    useEffect(() => {
        if (activeTab === "TRABAJOS") {
            fetchJobPosts()
        }
    }, [activeTab])

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                {/* sidebar toggle button */}
            <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? 'Close' : 'Menu'}
                </button>
                
                <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
    <button><span class="material-symbols-outlined">menu</span></button>
                </div>
                {/* sidebar toggle button up to here */}
                <div className="nav-items">
                    <div
                        className={
                            activeTab === "TRABAJOS"
                                ? "active-tab"
                                : "not-active"
                        }
                        onClick={() => setActiveTab("TRABAJOS")}
                    >
                        Trabajos
                    </div>
                    <div
                        className={
                            activeTab === "DASHBOARD"
                                ? "active-tab"
                                : "not-active"
                        }
                        onClick={() => setActiveTab("DASHBOARD")}
                    >
                        Publicar
                    </div>
                    {/* <div className={activeTab==='PERFIL' ? 'active-tab' : 'not-active' } onClick={()=>
                setActiveTab('PERFIL')}>
                Perfil
            </div> */}
                    <div onClick={logout}>Logout</div>
                </div>
            </div>
            <div className="main-content">
                {activeTab === "DASHBOARD" && (
                    <div className="dashboardDiv">
                        <div>
                            <JobPostForm />
                        </div>
                    </div>
                )}

                {activeTab === "TRABAJOS" && (
                    <div className="trabajos-full-container">
                        <div className="searchbar">
                        <SearchBar onSearch={onSearch}/>
                        </div>
                        <div className="trabajos-dashboard">
                            {jobPosts.map((job) => (
                                <JobsTab
                                    key={job._id}
                                    job={job}
                                    onEdit={setJobToEdit}
                                    onDelete={() => handleDelete(job._id)}
                                    onRestore={() => handleRestore(job._id)}
                                    onJobUpdated={(updatedJob) => {
                                        handleJobUpdated(updatedJob) // This function updates the job list
                                        setJobToEdit(null) // Close the edit form
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "PERFIL" && <div>Perfil Content</div>}
            </div>
        </div>
    )
}

export default Dashboard
