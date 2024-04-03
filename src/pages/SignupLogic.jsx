// src/components/SignupLogic.jsx
import React, { useState } from 'react';
import "./Login.css"
import { useAuth } from '../contexts/authContext'; // Correct the import path if necessary


const SignupLogic = ({ setIsSignupActive }) => {
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const { signup } = useAuth(); // Using signup from AuthContext
const [showSuccessAlert, setShowSuccessAlert] = useState(false);
const [confirmPassword, setConfirmPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);


const handleSubmit = async (event) => {
event.preventDefault();
setErrorMessage('');

    
    if (password !== confirmPassword) {
        setErrorMessage('Las contraseñas no coinciden.');
        return; // Stop the submission if passwords do not match
    } else if (!username || !email || !password) {  
        setErrorMessage("Todos los campos son obligatorios."); 
    } 
        
try {
const success = await signup(username, email, password, confirmPassword);
if (success) {
setShowSuccessAlert(true);
 // Reset the form fields
 setUsername('');
 setEmail('');
 setPassword('');
    setConfirmPassword('');
}
} catch (error) {
setErrorMessage(error.message);
}
};

const handleCloseAlert = () => {
setShowSuccessAlert(false);
setIsSignupActive(false); // Toggle to the login form
};

return (
<div className="form-control signup-form background-signup">
    <form onSubmit={handleSubmit}>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        {/* show success card when correctly logged in. */}
        {showSuccessAlert && (
                <div className="success-alert">
            <p>Tu cuenta fue registrada correctamente</p>
            <button onClick={handleCloseAlert}>OK</button>
        </div>
        )}
          
        {/* form for signing up */}
        <h2 className='h2-form'>Crea tu cuenta</h2>
        <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)}placeholder="Nombre de usuario"
        required />
        <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email" required />
         {/* Password input field */}
         <div className="password-field">
          <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
          <span className="material-symbols-outlined toggle-password" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'visibility_off' : 'visibility'}
          </span>
        </div>

        {/* Confirm Password input field */}
        <div className="password-field">
          <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmar contraseña" required />
          <span className="material-symbols-outlined toggle-password" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'visibility_off' : 'visibility'}
          </span>
        </div> <button type='submit'>Registrarme</button>
    </form>
</div>

);
};

export default SignupLogic;
