//JobPostForm.jsx
import React, { useState, useContext } from 'react';
import "./JobPost.css"
import Modal from '../Modal';
import { AuthContext } from '../../contexts/authContext';

const JobPostForm = () => {
const { token } = useContext(AuthContext);
const [showModal, setShowModal] = useState(false);
const [modalMessage, setModalMessage] = useState('');

// Define initial state for the form
const initialState = {
title: '',
company: '',
location: '',
employmentType: '',
employmentStyle: '',
description: '',
requirements: '',
salaryRange: '',
contactEmail: '',
applicationLink: '',
};

const [jobData, setJobData] = useState(initialState);

const postJob = async () => {
try {
const response = await fetch('http://localhost:5000/jobpost', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${token}`
},
body: JSON.stringify(jobData),
});
if (!response.ok) {
throw new Error('Failed to post job');
}
const result = await response.json();
setShowModal(true);
setModalMessage('Publicado correctamente');
setJobData(initialState);
   
} catch (error) {
   setShowModal(true);
setModalMessage('No fue posible publicarlo, intente nuevamente ');
}
};

const handleChange = (e) => {
setJobData({ ...jobData, [e.target.name]: e.target.value });
};

const handleSubmit = (event) => {
event.preventDefault();
postJob();
};

const closeModal = () => {
setShowModal(false);
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
            <option value="Hibrida">Híbrida</option>
        </select>
        <textarea name="description" value={jobData.description} onChange={handleChange} placeholder="Descripcion"
            required></textarea>
       
        <input type="text" name="salaryRange" value={jobData.salaryRange} onChange={handleChange}
            placeholder="Rango de sueldo" />
        <input type="email" name="contactEmail" value={jobData.contactEmail} onChange={handleChange}
            placeholder="Email de contacto" />
        <input type="url" name="applicationLink" value={jobData.applicationLink} onChange={handleChange}
            placeholder="Linkedin Post" />
        <button type="submit" className="submit-btn">Publicar</button>
        {showModal &&
        <Modal message={modalMessage} onClose={closeModal} />}

    </form>
</div>
);
};

export default JobPostForm;