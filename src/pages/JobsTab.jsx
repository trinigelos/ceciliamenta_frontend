// JobsTab.jsx
// JOBS DASHBOARD; showing all non expanded job posts. Has functionality to open up the whole description 
//  and open the editform. 
// uses components of JobEditForm: to show full description and to edit it.

import React, { useState, useEffect } from 'react';
import { formatDate } from '../components/component';
import { JobDescription } from '../components/component';
import JobEditForm from '../components/CRUD/JobEditForm';
import "./jobsTab.css";


const JobsTab = ({ job, onEdit, onJobUpdated, onDelete }) => {
const [isExpanded, setIsExpanded] = useState(false);
const [isEditing, setIsEditing] = useState(false);

// function to expand view of jobs
const handleToggle = () => {
setIsExpanded(!isExpanded);
setIsEditing(false); // Reset editing state when closing
    };
    
// function to edit the job
const handleEditClick = (e) => {
e.stopPropagation(); // Prevent the expanded view from closing
onEdit(job); // Call onEdit with the job to be edited
setIsEditing(true);

    };
    
    
  //function to press ESC to close the job
  const handleEscKey = (event) => {
    if (event.key === "Escape") {
      setIsExpanded(false);
    }
  };
// refreshes to listen to ESC events and removes it to avoid memory leaks
  useEffect(() => {
    if (isExpanded) {
      document.addEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isExpanded]);

return (
    
<div className="jobsContainer">
    <div className={`job-post-preview ${isExpanded ? 'expanded' : '' }`} onClick={handleToggle}>
        <h3>{job.title}</h3>
         <p>{job.company.slice(0, 40 )}...</p>
        <p><strong>Ubicacion: </strong> {job.location}</p>
        <p><strong>Disponibilidad: </strong> {job.employmentType}</p>
        {/* <p>{job.description.slice(0, 50)}...</p> */}

    </div>


    {/* expand view to display complete job */}
    {isExpanded && (
    <>
        <div className="backdrop-blur" onClick={handleToggle}></div>

        <div className="expanded-job-post ">
            <div className="intros-container-jobs">

                {!isEditing ? (
                <>
                                <div className="intro-control-jobs">
                                <div className="actionbuttons">
                                        <span class="material-symbols-outlined close-btn" onClick={handleToggle}>close</span>
                    <span class="material-symbols-outlined edit-btn" onClick={handleEditClick}>edit</span>
                    <span class="material-symbols-outlined trash-btn" onClick={onDelete}>delete</span>
                                    </div>
                                
                        {/* reading/view part of the tab */}
                        <div className='content-published-container'>
                            <h3>{job.title}</h3>
                            <p>{job.company}</p>
                            <p><strong>Ubicacion: </strong> {job.location}</p>
                            <p><strong>Disponibilidad: </strong> {job.employmentType}</p>
                            <p><strong>Modalidad: </strong>{job.employmentStyle}</p>
                            <p><strong>Descripción: </strong>
                                <JobDescription description={job.description} />
                                        </p>
                                        
                         {job.salaryRange && <p><strong>Salario: </strong>{job.salaryRange}</p>}
                         {job.contactEmail && <p><strong>Email de contacto: </strong>{job.contactEmail}</p>}
                                        {job.linkedinLink && <p><a href={job.linkedinLink} className='linkedinLink' target="_blank" rel="noopener noreferrer"><strong>LinkedIn</strong></a></p>}
                                        <p><strong>Publicado: </strong>{formatDate(job.createdAt)}</p> </div>

                                </div>
                                      
                </>
                ) : (
                // editing-job part of the tab
                <div className="intro-control-jobs edit-form-container">
                    <span className="material-icons close-btn-jobs" onClick={()=> setIsEditing(false)} >undo</span>
                                    
                    <JobEditForm jobToEdit={job} onJobUpdated={(updatedJob)=> {
                        onJobUpdated(updatedJob);
                        setIsEditing(false); // Close the edit form upon submission
                        }}
                        />
                </div>
                )}
            </div>

        </div>
    </>
    )}

</div>
);
};

export default JobsTab;