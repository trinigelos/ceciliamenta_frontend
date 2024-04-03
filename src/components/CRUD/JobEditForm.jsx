//src/components/JobEditForm.jsx
// Function: updates job posts, when edited.

import React, { useState, useEffect } from 'react';
import "./JobPost.css";
import Modal from '../Modal';

const JobEditForm = ({ jobToEdit, onJobUpdated }) => {
const [jobData, setJobData] = useState(jobToEdit);
const [showModal, setShowModal] = useState(false);
const [modalMessage, setModalMessage] = useState('');

useEffect(() => {
// Set the form fields to the job data when the component mounts or the jobToEdit changes
setJobData(jobToEdit);
}, [jobToEdit]);


const editJob = async () => {
try {
const response = await fetch(`http://localhost:5000/jobpost/${jobData._id}`, {
method: 'PUT',
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${localStorage.getItem('token')}` // Use token from localStorage
},
body: JSON.stringify(jobData),
});
if (!response.ok) {
throw new Error('Failed to update job');
}
const updatedJob = await response.json();
setShowModal(true);
setModalMessage('Actualizado correctamente');
    
// onJobUpdated(updatedJob);
} catch (error) {
setModalMessage('ERROR, intente nuevamente');
setShowModal(true);
}

};

const handleChange = (e) => {
setJobData({ ...jobData, [e.target.name]: e.target.value });
};

const handleSubmit = (event) => {
event.preventDefault();
event.stopPropagation();
editJob();
};
const closeModal = () => {
    setShowModal(false);
    onJobUpdated(jobData); 

};

return (

<div className="job-post-form">

    <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={jobData.title} onChange={handleChange} placeholder="Titulo de trabajo"
            required />
        <input type="text" name="company" value={jobData.company} onChange={handleChange} placeholder="Empresa"
            required />
        <input type="text" name="location" value={jobData.location} onChange={handleChange} placeholder="Ubicacion"
            required />
        <select name="employmentType" value={jobData.employmentType} onChange={handleChange}>
            <option value="empty">-</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
        </select>
        <select name="employmentStyle" value={jobData.employmentStyle} onChange={handleChange}>
            <option value="empty">-</option>
            <option value="Presencial">Presencial</option>
            <option value="Remoto">Remoto</option>
            <option value="Hibrido">Híbrida</option>

        </select>
        <textarea name="description" value={jobData.description} onChange={handleChange} placeholder="Descripcion"
            required></textarea>

        <input type="text" name="salaryRange" value={jobData.salaryRange} onChange={handleChange}
            placeholder="Salary Range" />
        <input type="email" name="contactEmail" value={jobData.contactEmail} onChange={handleChange}
            placeholder="Contact Email" />
        <input type="url" name="applicationLink" value={jobData.applicationLink} onChange={handleChange}
            placeholder="Application Link" />
        <button className='btn update-btn'>Actualizar</button>
        {showModal &&
        <Modal message={modalMessage} onClose={closeModal} />}

    </form>
</div>
);
};

export default JobEditForm;